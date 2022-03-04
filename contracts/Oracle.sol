//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Contract Owner Address: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 // Hardhat account #0
// Oracle Address 1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 // Hardhat account #1
// Oracle Address 2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC // Hardhat account #2
// Oracle Address 3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 // Hardhat account #3

// https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e
import "hardhat/console.sol";

contract Oracle {
    mapping(uint256 => Request) public requests; //list of requests made to the contract
    uint256 public currentId = 0; //increasing request id
    uint256 public minQuorum = 3; //minimum number of responses to receive before declaring final result
    uint256 public totalOracleCount = 3; // Hardcoded oracle count

    // defines a general api request
    struct Request {
        uint256 id; //request id
        string urlToQuery; //API url
        string attributeToFetch; //json attribute (key) to retrieve in the response
        string agreedValue; //value from key
        mapping(uint256 => string) answer; //answers provided by the oracles
        mapping(address => uint256) quorum; //oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
    }

    //event that triggers oracle outside of the blockchain
    event NewRequest(uint256 id, string urlToQuery, string attributeToFetch);

    //triggered when there's a consensus on the final result
    event UpdatedRequest(
        uint256 id,
        string urlToQuery,
        string attributeToFetch,
        string agreedValue
    );

    function createRequest(
        string memory _urlToQuery,
        string memory _attributeToFetch
    ) public {
        Request storage r = requests[currentId];
        r.id = currentId;
        r.urlToQuery = _urlToQuery;
        r.attributeToFetch = _attributeToFetch;
        r.agreedValue = "";

        // Hardcoded oracles address
        r.quorum[address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8)] = 1; // Hardhat account #1
        r.quorum[address(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)] = 1; // Hardhat account #2
        r.quorum[address(0x90F79bf6EB2c4f870365E785982E1f101E93b906)] = 1; // Hardhat account #3

        // launch an event to be detected by oracle outside of blockchain
        emit NewRequest(currentId, _urlToQuery, _attributeToFetch);

        // increase request id
        currentId++;
    }

    //called by the oracle to record its answer
    function updateRequest(uint256 _id, string memory _valueRetrieved) public {
        Request storage currRequest = requests[_id];

        //check if oracle is in the list of trusted oracles
        //and if the oracle hasn't voted yet
        if (currRequest.quorum[address(msg.sender)] == 1) {
            //marking that this address has voted
            currRequest.quorum[msg.sender] = 2;

            //iterate through "array" of answers until a position if free and save the retrieved value
            uint256 tmpI = 0;
            bool found = false;
            while (!found) {
                //find first empty slot
                if (bytes(currRequest.answer[tmpI]).length == 0) {
                    found = true;
                    currRequest.answer[tmpI] = _valueRetrieved;
                }
                tmpI++;
            }

            uint256 currentQuorum = 0;

            //iterate through oracle list and check if enough oracles(minimum quorum)
            //have voted the same answer has the current one
            for (uint256 i = 0; i < totalOracleCount; i++) {
                bytes memory a = bytes(currRequest.answer[i]);
                bytes memory b = bytes(_valueRetrieved);

                if (keccak256(a) == keccak256(b)) {
                    currentQuorum++;
                    if (currentQuorum >= minQuorum) {
                        currRequest.agreedValue = _valueRetrieved;
                        emit UpdatedRequest(
                            currRequest.id,
                            currRequest.urlToQuery,
                            currRequest.attributeToFetch,
                            currRequest.agreedValue
                        );
                    }
                }
            }
        }
    }
}
