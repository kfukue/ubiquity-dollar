import { OptionDefinition } from "command-line-args";

import { DeployFuncParam } from "../../shared";
import { create } from "../create";

export const optionDefinitions: OptionDefinition[] = [
    { name: "task", defaultOption: true },
    { name: "manager", alias: "m", type: String },
    { name: "network", alias: "n", type: String },
];

const func = async (params: DeployFuncParam) => {
    const contractInstance = "src/dollar/DirectGovernanceFarmer.sol:DirectGovernanceFarmer";
    const { env, args } = params;
    // const manager = args.manager;
    const manager = "0x4DA97a8b831C345dBe6d16FF7432DF2b7b776d98";
    const bass3Pool = "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7";
    const depositZap = "0xA79828DF1850E8a3A3064576f380D90aECDD3359";
    const { stderr } = await create({ ...env, name: args.task, network: args.network, contractInstance, constructorArguments: [manager, bass3Pool, depositZap] });
    return !stderr ? "succeeded" : "failed";
};
export default func;
