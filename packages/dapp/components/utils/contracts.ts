import { ContractInterface, ethers } from "ethers";

import UniswapV2PairABI from "../config/abis/UniswapV2Pair.json";
import UniswapV3PoolABI from "../config/abis/UniswapV3Pool.json";
import UniswapV3RouterABI from "../config/abis/UniswapV3Router.json";
import ChainlinkPriceFeedABI from "../config/abis/ChainlinkPriceFeed.json";
import ERC20ABI from "../config/abis/ERC20.json";
import USDCTokenABI from "../config/abis/USDCToken.json";
import DAITokenABI from "../config/abis/DAIToken.json";
import USDTTokenABI from "../config/abis/USDTToken.json";

import YieldProxyABI from "../config/abis/YieldProxy.json";

import SimpleBond from "@ubiquity/contracts/out/SimpleBond.sol/SimpleBond.json";
import UbiquiStick from "@ubiquity/contracts/out/UbiquiStick.sol/UbiquiStick.json";
import UbiquiStickSale from "@ubiquity/contracts/out/UbiquiStickSale.sol/UbiquiStickSale.json";
import ERC1155Ubiquity from "@ubiquity/contracts/out/ERC1155Ubiquity.sol/ERC1155Ubiquity.json";
import IJar from "@ubiquity/contracts/out/IJar.sol/IJar.json";
import DebtCouponManager from "@ubiquity/contracts/out/DebtCouponManager.sol/DebtCouponManager.json";
import ICurveFactory from "@ubiquity/contracts/out/ICurveFactory.sol/ICurveFactory.json";
import BondingShareV2 from "@ubiquity/contracts/out/BondingShareV2.sol/BondingShareV2.json";
import BondingV2 from "@ubiquity/contracts/out/BondingV2.sol/BondingV2.json";
import DebtCoupon from "@ubiquity/contracts/out/DebtCoupon.sol/DebtCoupon.json";
import DirectGovernanceFarmer from "@ubiquity/contracts/out/DirectGovernanceFarmer.sol/DirectGovernanceFarmer.json";
import DollarMintingCalculator from "@ubiquity/contracts/out/DollarMintingCalculator.sol/DollarMintingCalculator.json";
import ICouponsForDollarsCalculator from "@ubiquity/contracts/out/ICouponsForDollarsCalculator.sol/ICouponsForDollarsCalculator.json";
import IMetaPool from "@ubiquity/contracts/out/IMetaPool.sol/IMetaPool.json";
import IUARForDollarsCalculator from "@ubiquity/contracts/out/IUARForDollarsCalculator.sol/IUARForDollarsCalculator.json";
import MasterChefV2 from "@ubiquity/contracts/out/MasterChefV2.sol/MasterChefV2.json";
import SushiSwapPool from "@ubiquity/contracts/out/SushiSwapPool.sol/SushiSwapPool.json";
import TWAPOracle from "@ubiquity/contracts/out/TWAPOracle.sol/TWAPOracle.json";
import UbiquityAlgorithmicDollarManager from "@ubiquity/contracts/out/UbiquityAlgorithmicDollarManager.sol/UbiquityAlgorithmicDollarManager.json";
import UbiquityAlgorithmicDollar from "@ubiquity/contracts/out/UbiquityAlgorithmicDollar.sol/UbiquityAlgorithmicDollar.json";
import UbiquityCredit from "@ubiquity/contracts/out/UbiquityAutoRedeem.sol/UbiquityAutoRedeem.json";
import UbiquityFormulas from "@ubiquity/contracts/out/UbiquityFormulas.sol/UbiquityFormulas.json";
import UBQ from "@ubiquity/contracts/out/UbiquityGovernance.sol/UbiquityGovernance.json";

const getContract = (abi: ContractInterface, address: string, provider: ethers.providers.Provider) => {
  if (address === "0x2d13826359803522cce7a4cfa2c1b582303dd0b4") {
    // console.log(`in get Contract ${JSON.stringify(abi)}`);
    const test = new ethers.Contract(address, abi, provider);
    console.log(`in getContract : ${test}`);
  }
  if (address === "0x0F644658510c95CB46955e55D7BA9DDa9E9fBEc6") {
    // console.log(` uad in get Contract ${JSON.stringify(abi)}`);
  }

  return new ethers.Contract(address, abi, provider);
};

export const getUniswapV2FactoryContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(UniswapV2PairABI, address, provider);
};

export const getUniswapV3PoolContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(UniswapV3PoolABI, address, provider);
};

export const getUniswapV3RouterContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(UniswapV3RouterABI, address, provider);
};

export const getChainlinkPriceFeedContract = (address: string, provider: ethers.providers.Provider): ethers.Contract => {
  return getContract(ChainlinkPriceFeedABI, address, provider);
};

export const getERC20Contract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(ERC20ABI, address, provider);
};

export const getERC1155UbiquityContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(ERC1155Ubiquity.abi, address, provider);
};

export const getSimpleBondContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(SimpleBond.abi, address, provider);
};

export const getUbiquiStickContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(UbiquiStick.abi, address, provider);
};

export const getUbiquiStickSaleContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(UbiquiStickSale.abi, address, provider);
};

export const getIJarContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(IJar.abi, address, provider);
};

export const getDebtCouponManagerContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(DebtCouponManager.abi, address, provider);
};

export const getCurveFactoryContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(ICurveFactory.abi, address, provider);
};

export const getYieldProxyContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(YieldProxyABI, address, provider);
};

export const getBondingShareV2Contract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(BondingShareV2.abi, address, provider);
};

export const getBondingV2Contract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(BondingV2.abi, address, provider);
};

export const getDebtCouponContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(DebtCoupon.abi, address, provider);
};

export const getTWAPOracleContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(TWAPOracle.abi, address, provider);
};

export const getDirectGovernanceFarmerContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(DirectGovernanceFarmer.abi, address, provider);
};
export const getDollarMintingCalculatorContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(DollarMintingCalculator.abi, address, provider);
};

export const getICouponsForDollarsCalculatorContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(ICouponsForDollarsCalculator.abi, address, provider);
};

export const getIUARForDollarsCalculatorContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(IUARForDollarsCalculator.abi, address, provider);
};

export const getIMetaPoolContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(IMetaPool.abi, address, provider);
};

export const getMasterChefV2Contract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(MasterChefV2.abi, address, provider);
};

export const getSushiSwapPoolContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(SushiSwapPool.abi, address, provider);
};

export const getUbiquityAlgorithmicDollarManagerContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(UbiquityAlgorithmicDollarManager.abi, address, provider);
};

export const getUbiquityAlgorithmicDollarContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(UbiquityAlgorithmicDollar.abi, address, provider);
};

export const getUbiquityCreditContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(UbiquityCredit.abi, address, provider);
};

export const getUbiquityFormulasContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(UbiquityFormulas.abi, address, provider);
};

export const getUbqContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(UBQ.abi, address, provider);
};

export const getUSDCTokenContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(USDCTokenABI, address, provider);
};

export const getDAITokenContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(DAITokenABI, address, provider);
};

export const getUSDTTokenContract = (address: string, provider: ethers.providers.Provider) => {
  return getContract(USDTTokenABI, address, provider);
};
