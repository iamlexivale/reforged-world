"use client";

import useSWR from "swr";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  const townName = pathname?.split("/").pop();

  const { data: towns } = useSWR(
    `https://api.reforged.world/v1/town/${townName}`,
    fetcher,
  );

  return (
    <div className="space-y-4 text-white">
      <div
        className="font-sans text-xs font-bold text-white opacity-50 hover:cursor-pointer hover:opacity-60"
        onClick={() => router.push(`/stats/town/`)}
      >
        BACK TO TOWN LIST
      </div>
      <div className="border border-slate-800 bg-slate-900 p-4">
        <div>Name: {towns?.town?.name}</div>
        <div>Mayor: {towns?.town?.mayor}</div>
        <div>Nation: {towns?.town?.nation}</div>
        <div>Town Board: {towns?.town?.townBoard}</div>
        {/* <div>Tag: {towns?.town?.tag}</div> */}
        <div>Founder: {towns?.town?.founder}</div>
        {/* <div>Protection Status: {towns?.town?.protectionStatus}</div>
        <div>Bonus: {towns?.town?.bonus}</div>
        <div>Purchased: {towns?.town?.purchased}</div>
        <div>Tax Percent: {towns?.town?.taxpercent.toString()}</div>
        <div>Max Percent Tax Amount: {towns?.town?.maxPercentTaxAmount}</div>
        <div>Taxes: {towns?.town?.taxes}</div>
        <div>Has Upkeep: {towns?.town?.hasUpkeep.toString()}</div>
        <div>Plot Price: {towns?.town?.plotPrice}</div>
        <div>Plot Tax: {towns?.town?.plotTax}</div>
        <div>Commercial Plot Price: {towns?.town?.commercialPlotPrice}</div>
        <div>Commercial Plot Tax: {towns?.town?.commercialPlotTax}</div>
        <div>Embassy Plot Price: {towns?.town?.embassyPlotPrice}</div>
        <div>Embassy Plot Tax: {towns?.town?.embassyPlotTax}</div>
        <div>Open: {towns?.town?.open.toString()}</div>
        <div>Public: {towns?.town?.public.toString()}</div>
        <div>
          Admin Enabled Mobs: {towns?.town?.adminEnabledMobs.toString()}
        </div>
        <div>
          Admin Disabled PvP: {towns?.town?.admindisabledpvp.toString()}
        </div>
        <div>Admin Enabled PvP: {towns?.town?.adminenabledpvp.toString()}</div>
        <div>Allowed to War: {towns?.town?.allowedToWar.toString()}</div>
        <div>Homeblock: {towns?.town?.homeblock}</div>
        <div>Spawn: {towns?.town?.spawn}</div>
        <div>Outpost Spawns: {towns?.town?.outpostSpawns}</div>
        <div>Outlaws: {towns?.town?.outlaws}</div>
        <div>UUID: {towns?.town?.uuid}</div>
        <div>
          Registered:{" "}
          {new Date(parseInt(towns?.town?.registered)).toLocaleString()}
        </div>
        <div>Spawn Cost: {towns?.town?.spawnCost}</div>
        <div>Map Color Hex Code: {towns?.town?.mapColorHexCode}</div>
        <div>Metadata: {towns?.town?.metadata}</div>
        <div>Conquered Days: {towns?.town?.conqueredDays}</div>
        <div>Conquered: {towns?.town?.conquered.toString()}</div>
        <div>Ruined: {towns?.town?.ruined.toString()}</div>
        <div>Ruined Time: {towns?.town?.ruinedTime}</div>
        <div>Neutral: {towns?.town?.neutral.toString()}</div>
        <div>Debt Balance: {towns?.town?.debtBalance}</div>
        <div>
          Joined Nation At:{" "}
          {new Date(parseInt(towns?.town?.joinedNationAt)).toLocaleString()}
        </div>
        <div>Primary Jail: {towns?.town?.primaryJail}</div>
        <div>
          Moved Home Block At:{" "}
          {new Date(parseInt(towns?.town?.movedHomeBlockAt)).toLocaleString()}
        </div>
        <div>Trusted Residents: {towns?.town?.trustedResidents}</div>
        <div>Trusted Towns: {towns?.town?.trustedTowns}</div>
        <div>Nation Zone Override: {towns?.town?.nationZoneOverride}</div>
        <div>
          Nation Zone Enabled: {towns?.town?.nationZoneEnabled.toString()}
        </div>
        <div>Allies: {towns?.town?.allies}</div>
        <div>Enemies: {towns?.town?.enemies}</div>
        <div>
          Has Unlimited Claims: {towns?.town?.hasUnlimitedClaims.toString()}
        </div>
        <div>Manual Town Level: {towns?.town?.manualTownLevel}</div>
        <div>For Sale: {towns?.town?.forSale.toString()}</div>
        <div>For Sale Price: {towns?.town?.forSalePrice}</div>
        <div>
          Visible on Top Lists: {towns?.town?.visibleOnTopLists.toString()}
        </div>
        <div>Jail Spawns: {towns?.town?.jailSpawns}</div> */}
      </div>
    </div>
  );
};

export default Page;
