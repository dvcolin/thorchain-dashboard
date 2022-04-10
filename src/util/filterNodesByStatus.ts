import { IThorNode } from "../types";

export const filterNodesByStatus = (nodes: IThorNode[]) => {
  const filteredNodes = nodes.reduce<Array<IThorNode[]>>(
    (acc, cur) => {
      if (cur.status === "Active") {
        acc[0].push(cur);
      } else if (
        cur.status === "Standby" ||
        cur.preflight_status.status === "Ready"
      ) {
        acc[1].push(cur);
      } else if (cur.status === "Disabled") {
        acc[2].push(cur);
      }
      return acc;
    },
    [[], [], []]
  );
  return filteredNodes;
};
