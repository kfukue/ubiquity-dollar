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
    const manager = args.manager;
    const base3Pool = "0x0F644658510c95CB46955e55D7BA9DDa9E9fBEc6";
    const depositZap = "0xA79828DF1850E8a3A3064576f380D90aECDD3359";

    const { stderr } = await create({ ...env, name: args.task, network: args.network, contractInstance, constructorArguments: [manager, base3Pool, depositZap] });
    return !stderr ? "succeeded" : "failed";
};
export default func;
