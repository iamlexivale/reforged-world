import React from "react";

const groupMapping: { [key: string]: string } = {
  default: "[Peasant]",
  vip: "[VIP]",
  vip1: "[VIP+]",
  vip2: "[VIP++]",
  mvp: "[MVP]",
  helper: "[Helper]",
  mod: "[Mod]",
  admin: "[Admin]",
};

interface PlayerGroupProps {
  primaryGroup: string;
}

const PlayerGroup: React.FC<PlayerGroupProps> = ({ primaryGroup }) => {
  const groupLabel = groupMapping[primaryGroup] || primaryGroup;
  return <span>{groupLabel}</span>;
};

export default PlayerGroup;
