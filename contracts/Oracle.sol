//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Contract Owner Address: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 // Hardhat account #0
// Oracle Address 1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 // Hardhat account #1
// Oracle Address 2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC // Hardhat account #2
// Oracle Address 3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 // Hardhat account #3
// Oracle Address 4: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 // Hardhat account #4
// https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e
import "hardhat/console.sol";

contract Oracle {
    // list of requests made to the contract
    mapping(uint256 => Request) public requests;

    // Incremental request id
    uint256 public currentId = 0;

    // Minimum number of responses to receive before declaring final result
    uint256 public minQuorum = 3;

    // Hardcoded oracle count
    uint256 public totalOracleCount = 4;

    // Defines a general api request
    struct Request {
        uint256 id; // Request id
        string temperature; // Get final temperature
        mapping(uint256 => string) answer; // This would be an array of temperatures provided by the oracles
        mapping(address => uint256) quorum; // Oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
    }

    // An event that triggers oracle outside of the blockchain
    event NewRequest(uint256 id);

    // Triggered when there's a consensus on the final result
    event UpdatedRequest(uint256 id, string temperature);

    function createRequest() public {
        Request storage r = requests[currentId];
        r.id = currentId;
        r.temperature = "";

        // Hardcoded oracle addresses
        r.quorum[address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8)] = 1; // Hardhat account #1
        r.quorum[address(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)] = 1; // Hardhat account #2
        r.quorum[address(0x90F79bf6EB2c4f870365E785982E1f101E93b906)] = 1; // Hardhat account #3
        r.quorum[address(0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65)] = 1; // Hardhat account #4

        // Trigger an event to be detected by oracle outside of blockchain
        emit NewRequest(currentId);

        // Increase request id
        currentId++;
    }

    // Called by the oracle to record its answer
    function updateRequest(uint256 _id, string memory _valueRetrieved) public {
        Request storage currRequest = requests[_id];

        // To check if oracle is in the list of trusted oracles
        // and if the oracle hasn't voted yet
        if (currRequest.quorum[address(msg.sender)] == 1) {
            // Marking that this address has voted
            currRequest.quorum[msg.sender] = 2;

            // To iterate through "array" of answers until a position
            // if free and save the retrieved value
            uint256 tmpI = 0;
            bool found = false;
            while (!found) {
                // To find first empty slot
                if (bytes(currRequest.answer[tmpI]).length == 0) {
                    found = true;
                    currRequest.answer[tmpI] = _valueRetrieved;
                }
                tmpI++;
            }

            uint256 currentQuorum = 0;

            // To make sure no one is submitting the wrong values,
            // we iterate through oracle list and check if enough
            // oracles(minimum quorum) have voted the same answer
            // has the current one.
            for (uint256 i = currentQuorum; i < totalOracleCount; i++) {
                bytes memory a = bytes(currRequest.answer[i]);
                bytes memory b = bytes(_valueRetrieved);

                if (keccak256(a) == keccak256(b)) {
                    currentQuorum++;

                    // To detect outliers, we can have more oracles
                    // to ensure the data is accurate
                    if (currentQuorum >= minQuorum) {
                        // Set final temperature
                        currRequest.temperature = _valueRetrieved;

                        emit UpdatedRequest(
                            currRequest.id,
                            currRequest.temperature
                        );
                    }
                }
            }
        }
    }
}
