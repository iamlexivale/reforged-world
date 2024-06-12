"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import Information from "./(pages)/Information";
import StatsPlayer from "./(pages)/StatsPlayer";
import StatsTown from "./(pages)/StatsTown";
import StatsNation from "./(pages)/StatsNation";
import LeadPlayer from "./(pages)/LeadPlayer";
import LeadTown from "./(pages)/LeadTown";
import LeadNation from "./(pages)/LeadNation";

const Page = () => {
  return (
    <div className="h-screen bg-slate-950 pt-24">
      <div className="mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <TabGroup className="flex flex-row gap-x-16">
          <TabList className="flex w-1/6 flex-col space-y-2">
            <div className="px-4 font-sans text-sm font-bold text-white opacity-50">
              SERVER
            </div>
            <Tab
              className={({ selected }) =>
                selected
                  ? "rounded bg-slate-900 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none"
                  : "px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 focus:outline-none"
              }
            >
              Information
            </Tab>
            <div className="border-b border-white pt-2 opacity-10" />
            <div className="px-4 pt-2 font-sans text-sm font-bold text-white opacity-50">
              STATS
            </div>
            <Tab
              className={({ selected }) =>
                selected
                  ? "rounded bg-slate-900 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none"
                  : "px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 focus:outline-none"
              }
            >
              Player
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "rounded bg-slate-900 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none"
                  : "px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 focus:outline-none"
              }
            >
              Town
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "rounded bg-slate-900 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none"
                  : "px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 focus:outline-none"
              }
            >
              Nation
            </Tab>
            <div className="border-b border-white pt-2 opacity-10" />
            <div className="px-4 pt-2 font-sans text-sm font-bold text-white opacity-50">
              LEADERBOARD
            </div>
            <Tab
              className={({ selected }) =>
                selected
                  ? "rounded bg-slate-900 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none"
                  : "px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 focus:outline-none"
              }
            >
              Players
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "rounded bg-slate-900 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none"
                  : "px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 focus:outline-none"
              }
            >
              Towns
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "rounded bg-slate-900 px-4 py-1 text-left font-sans text-base font-medium text-white focus:outline-none"
                  : "px-4 py-1 text-left font-sans text-base font-medium text-white opacity-75 focus:outline-none"
              }
            >
              Nations
            </Tab>
          </TabList>
          <TabPanels className="w-5/6">
            <TabPanel>
              <Information />
            </TabPanel>
            <TabPanel>
              <StatsPlayer />
            </TabPanel>
            <TabPanel>
              <StatsTown />
            </TabPanel>
            <TabPanel>
              <StatsNation />
            </TabPanel>
            <TabPanel>
              <LeadPlayer />
            </TabPanel>
            <TabPanel>
              <LeadTown />
            </TabPanel>
            <TabPanel>
              <LeadNation />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default Page;
