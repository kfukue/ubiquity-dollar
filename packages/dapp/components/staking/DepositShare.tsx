import { BigNumber, ethers } from "ethers";
import { useEffect, useState, useCallback, Dispatch, SetStateAction } from "react";

import { ManagedContracts } from "@/lib/hooks/contracts/useManagerManaged";
import { constrainNumber } from "@/lib/utils";
import withLoadedContext, { LoadedContext } from "@/lib/withLoadedContext";
import Button from "../ui/Button";
import PositiveNumberInput from "../ui/PositiveNumberInput";
import Icon, { IconsNames } from "../ui/Icon";
import { Balances } from "../lib/hooks/useBalances";
import { tokenSvg } from "../layout/Inventory";
import icons from "@/ui/icons";

const toEtherNum = (n: BigNumber) => +n.toString() / 1e18;
const toNum = (n: BigNumber) => +n.toString();

const MIN_WEEKS = 1;
const MAX_WEEKS = 208;

type PrefetchedConstants = { totalShares: number; usdPerWeek: number; bondingDiscountMultiplier: BigNumber };
async function prefetchConstants(contracts: NonNullable<ManagedContracts>): Promise<PrefetchedConstants> {
  const reserves = await contracts.governanceMarket.getReserves();

  const ubqPrice = +reserves[0].toString() / +reserves[1].toString();
  const ubqPerBlock = await contracts.masterChef.uGOVPerBlock();
  const ubqMultiplier = await contracts.masterChef.uGOVmultiplier();
  const actualUbqPerBlock = toEtherNum(ubqPerBlock.mul(ubqMultiplier).div(`${1e18}`));
  const blockCountInAWeek = toNum(await contracts.staking.blockCountInAWeek());
  const ubqPerWeek = actualUbqPerBlock * blockCountInAWeek;
  const totalShares = toEtherNum(await contracts.masterChef.totalShares());
  const usdPerWeek = ubqPerWeek * ubqPrice;
  const bondingDiscountMultiplier = await contracts.staking.bondingDiscountMultiplier();
  return { totalShares, usdPerWeek, bondingDiscountMultiplier };
}

async function calculateApyForWeeks(contracts: NonNullable<ManagedContracts>, prefetch: PrefetchedConstants, weeksNum: number): Promise<number> {
  const { totalShares, usdPerWeek, bondingDiscountMultiplier } = prefetch;
  const DAYS_IN_A_YEAR = 365.2422;
  const usdAsLp = 0.7460387929; // TODO: Get this number from the Curve contract
  const bigNumberOneUsdAsLp = ethers.utils.parseEther(usdAsLp.toString());
  const weeks = BigNumber.from(weeksNum.toString());
  const shares = toEtherNum(await contracts.ubiquityFormulas.durationMultiply(bigNumberOneUsdAsLp, weeks, bondingDiscountMultiplier));
  const rewardsPerWeek = (shares / totalShares) * usdPerWeek;
  const yearlyYield = (rewardsPerWeek / 7) * DAYS_IN_A_YEAR * 100;
  return Math.round(yearlyYield * 100) / 100;
}

// async function calculateExpectedShares(contracts: Contracts, prefetch: PrefetchedConstants, amount: string, weeks: string): Promise<number> {
//   const { bondingDiscountMultiplier } = prefetch;
//   const weeksBig = BigNumber.from(weeks);
//   const amountBig = ethers.utils.parseEther(amount);
//   const expectedShares = await contracts.ubiquityFormulas.durationMultiply(amountBig, weeksBig, bondingDiscountMultiplier);
//   const expectedSharesNum = +ethers.utils.formatEther(expectedShares);
//   return Math.round(expectedSharesNum * 10000) / 10000;
// }

type DepositShareProps = {
  onStake: ({ amount, weeks }: { amount: BigNumber; weeks: BigNumber }) => void;
  disabled: boolean;
  maxLp: BigNumber;
  maxDai: BigNumber;
  maxUsdc: BigNumber;
  maxUsdt: BigNumber;
} & LoadedContext;

const DepositShare = ({ onStake, disabled, maxLp, maxDai, maxUsdc, maxUsdt, managedContracts: contracts }: DepositShareProps) => {
  const [amount, setAmount] = useState("");
  const [amountLp, setAmountLp] = useState("");

  const [amountTokenDai, setAmountTokenDai] = useState("");
  const [amountTokenUsdt, setAmountTokenUsdt] = useState("");
  const [amountTokenUsdc, setAmountTokenUsdc] = useState("");

  const [weeks, setWeeks] = useState("");
  const [currentApy, setCurrentApy] = useState<number | null>(null);
  const [prefetched, setPrefetched] = useState<PrefetchedConstants | null>(null);
  const [aprBounds, setApyBounds] = useState<[number, number] | null>(null);

  const onSetAmountLp = (amount: string) => {
    setAmountLp(amount);
  };
  const onSetAmountTokenDai = (amount: string) => {
    setAmountTokenDai(amount);
  };
  const onSetAmountTokenUsdc = (amount: string) => {
    setAmountTokenUsdc(amount);
  };
  const onSetAmountTokenUsdt = (amount: string) => {
    setAmountTokenUsdt(amount);
  };
  function validateAmount(): string | null {
    let msg = "";
    // if (amount) {
    //   const amountBig = ethers.utils.parseEther(amount);
    //   if (amountBig.gt(maxLp)) return `You don't have enough uAD-3CRV tokens`;
    // }
    if (amountLp) {
      msg += validateTokenAmount(amountLp, 18, maxLp, "uAD-3CRV");
    }
    if (amountTokenDai) {
      msg += validateTokenAmount(amountTokenDai, 18, maxDai, "DAI");
    }
    if (amountTokenUsdc) {
      msg += validateTokenAmount(amountTokenUsdc, 6, maxUsdc, "USDC");
    }
    if (amountTokenUsdt) {
      msg += validateTokenAmount(amountTokenUsdt, 6, maxUsdt, "USDT");
    }

    return msg;
  }

  function validateTokenAmount(amount: string, decimals: number, maxAmount: BigNumber, tokenName: string) {
    const amountBig = ethers.utils.parseUnits(amount, decimals);
    if (amountBig.gt(maxAmount)) return `You don't have enough ${tokenName} tokens`;
  }

  const error = validateAmount();
  const hasErrors = !!error;

  const onWeeksChange = (inputVal: string) => {
    setWeeks(inputVal && constrainNumber(parseInt(inputVal), MIN_WEEKS, MAX_WEEKS).toString());
  };

  const onAmountChange = (inputVal: string) => {
    setAmount(inputVal);
  };

  const onClickStake = () => {
    console.log(`on click ${amountLp}`);
    onStake({ amount: ethers.utils.parseEther(amountLp), weeks: BigNumber.from(weeks) });
  };

  const onClickMaxWeeks = () => {
    setWeeks(MAX_WEEKS.toString());
  };

  useEffect(() => {
    (async function () {
      const prefetched = await prefetchConstants(contracts);
      setPrefetched(prefetched);
      const [minApy, maxApy] = await Promise.all([
        calculateApyForWeeks(contracts, prefetched, MIN_WEEKS),
        calculateApyForWeeks(contracts, prefetched, MAX_WEEKS),
      ]);
      setApyBounds([minApy, maxApy]);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (prefetched && weeks) {
        setCurrentApy(await calculateApyForWeeks(contracts, prefetched, parseInt(weeks)));
      } else {
        setCurrentApy(null);
      }
    })();
  }, [prefetched, weeks]);

  const noInputYet = !amount || !weeks;
  const amountParsed = parseFloat(amount);
  const usdcFix = (key: string) => {
    if (key == "usdc" || key == "usdt") return 6;
    else return 18;
  };
  function showIfBalanceExists(
    amount: string,
    key: keyof Balances,
    name: keyof typeof tokenSvg,
    disabled: boolean,
    maxAmount: BigNumber,
    setAmount: (amount: string) => void,
    placeholder: string
  ) {
    return (
      <DepositInput
        amount={amount}
        decimals={usdcFix()}
        disabled={disabled}
        maxToken={maxAmount}
        setAmount={setAmount}
        iconName={name}
        placeHolder={placeholder}
      />
    );
  }

  return (
    <div className="panel">
      <h2>Stake liquidity to receive UBQ</h2>
      <div>APR {currentApy ? `${currentApy}%` : aprBounds ? `${aprBounds[1]}%` : "..."}</div>
      <div className="depositContainer">
        <div>Tokens To Stake</div>
        <div className="tokensContainer">
          <div className="content1">
            <DepositInput
              amount={amountLp}
              decimals={usdcFix("uad3crv")}
              disabled={disabled}
              maxToken={maxLp}
              setAmount={onSetAmountLp}
              iconName="uAD3CRV-f"
              placeHolder="uAD-3CRV LP Tokens"
            />
            {/* {showIfBalanceExists(amountLp, "uad3crv", "uAD3CRV-f", disabled, maxLp, onSetAmountLp, "uAD-3CRV LP Tokens")} */}
          </div>
          <div className="content2">
            <DepositInput
              amount={amountTokenDai}
              decimals={usdcFix("dai")}
              disabled={disabled}
              maxToken={maxDai}
              setAmount={onSetAmountTokenDai}
              iconName="DAI"
              placeHolder="DAI Tokens"
            />
            {/* {showIfBalanceExists(amountTokenDai, "dai", "DAI", disabled, maxDai, onSetAmountTokenDai, "DAI Tokens")} */}
          </div>
          <div className="content3">
            <DepositInput
              amount={amountTokenUsdc}
              decimals={usdcFix("usdc")}
              disabled={disabled}
              maxToken={maxUsdc}
              setAmount={onSetAmountTokenUsdc}
              iconName="USDC"
              placeHolder="USDC Tokens"
            />
          </div>
          {/* {showIfBalanceExists(amountTokenUsdc, "usdc", "USDC", disabled, maxUsdc, onSetAmountTokenUsdc, "USDC Tokens")} */}
          <div className="content4">
            <DepositInput
              amount={amountTokenUsdt}
              decimals={usdcFix("usdt")}
              disabled={disabled}
              maxToken={maxUsdt}
              setAmount={onSetAmountTokenUsdt}
              iconName="USDT"
              placeHolder="USDT Tokens"
            />
            {/* {showIfBalanceExists(amountTokenUsdt, "usdt", "USDT", disabled, maxUsdt, onSetAmountTokenUsdt, "USDT Tokens")} */}
          </div>
        </div>
        <div>
          <div className="weeksInputContainer">
            <div>Locking Period</div>
            <div className="maxContainer">
              <a onClick={onClickMaxWeeks}>{`MAX:${MAX_WEEKS} Weeks`}</a>
            </div>
            <div>
              <PositiveNumberInput
                className="weekInput"
                value={weeks}
                fraction={false}
                onChange={onWeeksChange}
                disabled={disabled}
                placeholder={`Weeks (${MIN_WEEKS}-${MAX_WEEKS})`}
              />
            </div>
          </div>
          {/* <Button disabled={disabled || hasErrors || noInputYet || !amountParsed} onClick={onClickStake}> */}
          <Button onClick={onClickStake}>Stake Tokens</Button>
        </div>
      </div>
      <div className="error">{error && <p>{error}</p>}</div>
    </div>
  );
};

type DepositInputProps = {
  iconName?: keyof typeof tokenSvg;
  amount: string;
  decimals?: number;
  // setAmount: Dispatch<SetStateAction<string>>;
  setAmount: (amount: string) => void;
  disabled: boolean;
  maxToken: BigNumber;
  placeHolder: string;
  fraction?: boolean;
};

const DepositInput = ({ amount, decimals, disabled, maxToken, setAmount, iconName, placeHolder, fraction }: DepositInputProps) => {
  const Svg = iconName ? tokenSvg[iconName] : () => <></>;

  const onAmountChange = (inputVal: string) => {
    console.log(`in onAmountChange : ${inputVal}`);
    setAmount(inputVal);
  };

  const onClickMax = () => {
    if (decimals) setAmount(ethers.utils.formatUnits(maxToken, decimals));
  };

  return (
    <div className="tokenInputContainer">
      <div className="maxContainer">
        <a onClick={onClickMax}>{`MAX:${ethers.utils.formatUnits(maxToken, decimals)}`}</a>
      </div>
      <div>
        {<Svg />}
        <PositiveNumberInput fraction={fraction || true} value={amount} onChange={onAmountChange} disabled={disabled} placeholder={`${placeHolder}`} />
      </div>
    </div>
  );
};

export default withLoadedContext(DepositShare);
