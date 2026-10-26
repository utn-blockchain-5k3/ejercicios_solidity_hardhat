require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [process.env.PRIVATE_KEY].filter(Boolean),
    },
    amoy: {
      // El endpoint publico rpc-amoy.polygon.technology fue deprecado.
      // Definir AMOY_RPC_URL en .env (ej. un RPC de Alchemy) para mayor estabilidad.
      url: process.env.AMOY_RPC_URL || "https://polygon-amoy.drpc.org",
      accounts: [process.env.PRIVATE_KEY].filter(Boolean),
      chainId: 80002,
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonAmoy: process.env.POLYGONSCAN_API_KEY
    },
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com"
        }
      }
    ]
  }
};