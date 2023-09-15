import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  paths: {
    artifacts: '../frontend/artifacts',
  },
  typechain: {
    outDir: '../frontend/types/typechain',
    target: 'ethers-v5',
  },
};

export default config;
