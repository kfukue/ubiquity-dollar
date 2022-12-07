import { OptionDefinition } from "command-line-args";

import { DeployFuncCallback } from "../shared";
import bondingFunc, { optionDefinitions as bondingOptions } from "./dollar/Bonding";
import uAdManagerFunc, { optionDefinitions as uadManagerOptions } from "./dollar/UbiquityAlgorithmicDollarManager";
import bondingShareFunc, { optionDefinitions as bondingShareOptions } from "./dollar/BondingShare";
import bondingShareV2Func, { optionDefinitions as bondingShareV2Options } from "./dollar/BondingShareV2";
import couponsForDollarsCalculatorFunc, { optionDefinitions as couponsForDollarsCalculatorOptions } from "./dollar/CouponsForDollarsCalculator";
import curveUADIncentiveFunc, { optionDefinitions as curveUADIncentiveOptions } from "./dollar/CurveUADIncentive";
import debtCouponFunc, { optionDefinitions as debtCouponOptions } from "./dollar/DebtCoupon";
import debtCouponManagerFunc, { optionDefinitions as debtCouponManagerOptions } from "./dollar/DebtCouponManager";
import directGovernanceFarmerFunc, { optionDefinitions as directGovernanceFarmerOptions } from "./dollar/DirectGovernanceFarmer";
import dollarMintingCalculatorFunc, { optionDefinitions as dollarMintingCalculatorOptions } from "./dollar/DollarMintingCalculator";
import excessDollarsDistributorFunc, { optionDefinitions as excessDollarsDistributorOptions } from "./dollar/ExcessDollarDistributor";
import masterChefFunc, { optionDefinitions as masterChefOptions } from "./dollar/MasterChef";
import ubiquityGovernanceFunc, { optionDefinitions as ubiquityGovernanceOptions } from "./dollar/UbiquityGovernance";
import sushiSwapPoolFunc, { optionDefinitions as sushiSwapPoolOptions } from "./dollar/UbiquityGovernance";
import uARForDollarsCalculatorFunc, { optionDefinitions as uARForDollarsCalculatorOptions } from "./dollar/UARForDollarsCalculator";
import ubiquityAlgorithmicDollarFunc, { optionDefinitions as ubiquityAlgorithmDollarOptions } from "./dollar/UbiquityAlgorithmicDollar";
import ubiquityAutoRedeemFunc, { optionDefinitions as ubiquityAutoRedeemOptions } from "./dollar/UbiquityAutoRedeem";
import ubiquityFormulaFunc, { optionDefinitions as ubiquityFormulaOptions } from "./dollar/UbiquityFormulas";
import yieldProxyFunc, { optionDefinitions as yieldProxyOptions } from "./dollar/YieldProxy";
import ubiquiStickFunc, { optionDefinitions as ubiquiStickOptions } from "./ubiquistick/UbiquiStick";
import ubiquiStickSaleFunc, { optionDefinitions as ubiquiStickSaleOptions } from "./ubiquistick/UbiquiStickSale";
import uARFunc, { optionDefinitions as uAROptions } from "./ubiquistick/UAR";
import lpFunc, { optionDefinitions as lpOptions } from "./ubiquistick/LP";
import simpleBondFunc, { optionDefinitions as simpleBondOptions } from "./ubiquistick/SimpleBond";

export const DEPLOY_FUNCS: Record<string, { handler: DeployFuncCallback; options: OptionDefinition[] }> = {
  Bonding: {
    handler: bondingFunc,
    options: bondingOptions,
  },
  UbiquityAlgorithmicDollarManager: {
    handler: uAdManagerFunc,
    options: uadManagerOptions,
  },
  BondingShare: {
    handler: bondingShareFunc,
    options: bondingShareOptions,
  },
  BondingShareV2: {
    handler: bondingShareV2Func,
    options: bondingShareV2Options,
  },
  CouponsForDollarsCalculator: {
    handler: couponsForDollarsCalculatorFunc,
    options: couponsForDollarsCalculatorOptions,
  },
  CurveUADIncentive: {
    handler: curveUADIncentiveFunc,
    options: curveUADIncentiveOptions,
  },
  DebtCoupon: {
    handler: debtCouponFunc,
    options: debtCouponOptions,
  },
  DebtCouponManager: {
    handler: debtCouponManagerFunc,
    options: debtCouponManagerOptions,
  },
  DirectGovernanceFarmer: {
    handler: directGovernanceFarmerFunc,
    options: directGovernanceFarmerOptions,
  },
  DollarMintingCalculator: {
    handler: dollarMintingCalculatorFunc,
    options: dollarMintingCalculatorOptions,
  },
  ExcessDollarDistributor: {
    handler: excessDollarsDistributorFunc,
    options: excessDollarsDistributorOptions,
  },
  MasterChef: {
    handler: masterChefFunc,
    options: masterChefOptions,
  },
  UbiquityGovernance: {
    handler: ubiquityGovernanceFunc,
    options: ubiquityGovernanceOptions,
  },
  SushiSwapPool: {
    handler: sushiSwapPoolFunc,
    options: sushiSwapPoolOptions,
  },
  UARForDollarsCalculator: {
    handler: uARForDollarsCalculatorFunc,
    options: uARForDollarsCalculatorOptions,
  },
  UbiquityAlgorithmicDollar: {
    handler: ubiquityAlgorithmicDollarFunc,
    options: ubiquityAlgorithmDollarOptions,
  },
  UbiquityAutoRedeem: {
    handler: ubiquityAutoRedeemFunc,
    options: ubiquityAutoRedeemOptions,
  },
  UbiquityFormulas: {
    handler: ubiquityFormulaFunc,
    options: ubiquityFormulaOptions,
  },
  YieldProxy: {
    handler: yieldProxyFunc,
    options: yieldProxyOptions,
  },
  UbiquiStick: {
    handler: ubiquiStickFunc,
    options: ubiquiStickOptions,
  },
  UbiquiStickSale: {
    handler: ubiquiStickSaleFunc,
    options: ubiquiStickSaleOptions,
  },
  UAR: {
    handler: uARFunc,
    options: uAROptions,
  },
  LP: {
    handler: lpFunc,
    options: lpOptions,
  },
  SimpleBond: {
    handler: simpleBondFunc,
    options: simpleBondOptions,
  },
};
