"use client";

import useSWR from "swr";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  const nationName = pathname?.split("/").pop();

  const { data: nations } = useSWR(
    `https://api.reforged.world/v1/nation/${nationName}`,
    fetcher,
  );

  return (
    <div className="space-y-4 text-white">
      <div
        className="font-sans text-xs font-bold text-white opacity-50 hover:cursor-pointer hover:opacity-60"
        onClick={() => router.push(`/stats/nation/`)}
      >
        BACK TO NATION LIST
      </div>
      <div className="rounded border border-white border-opacity-30 p-4">
        <div>Name: {nations?.nation?.name}</div>
        <div>Capital: {nations?.nation?.capital}</div>
        <div>Tag: {nations?.nation?.tag}</div>
        <div>Allies: {nations?.nation?.allies}</div>
        <div>Enemies: {nations?.nation?.enemies}</div>
        <div>Taxes: {nations?.nation?.taxes}</div>
        <div>Tax Percent: {nations?.nation?.taxpercent}</div>
        <div>
          Max Percent Tag Amount: {nations?.nation?.maxPercentTaxAmount}
        </div>
        <div>Spawn Cost: {nations?.nation?.spawnCost}</div>
        <div>Neutral: {nations?.nation?.neutral}</div>
        <div>UUID: {nations?.nation?.uuid}</div>
        <div>Registered: {nations?.nation?.registered}</div>
        <div>Nation Board: {nations?.nation?.nationBoard}</div>
        <div>Map Color Hex Code: {nations?.nation?.mapColorHexCode}</div>
        <div>Nation Spawn: {nations?.nation?.nationSpawn}</div>
        <div>Is Public: {nations?.nation?.isPublic}</div>
        <div>Is Open: {nations?.nation?.isOpen}</div>
        <div>Metadata: {nations?.nation?.metadata}</div>
        <div>Conquered Tax: {nations?.nation?.conqueredTax}</div>
        <div>Sanctioned Towns: {nations?.nation?.sanctionedTowns}</div>
      </div>
    </div>
  );
};

export default Page;
