import * as dotenv from "dotenv";

dotenv.config();

export default {
  erc20Address:
    process.env.ERC20ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3",
};
