import { IThorNode } from "../types";

export const sortNodesByBond = (nodes: IThorNode[]) => {
  return nodes.sort((a, b) => +b.bond - +a.bond);
};
