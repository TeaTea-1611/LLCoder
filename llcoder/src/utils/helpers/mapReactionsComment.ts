import { ReactionsCommentFragment } from "../../generated/graphql";

interface FieldReactions {
  [key: string]: number;
}

export const mapReactionsComment = (reactions: ReactionsCommentFragment[]) => {
  const mapReactions: FieldReactions = {};
  if (reactions.length === 0) return mapReactions;
  reactions.forEach((rct) => {
    if (mapReactions[rct.type]) {
      mapReactions[rct.type] += 1;
    } else {
      mapReactions[rct.type] = 1;
    }
  });
  return Object.entries(mapReactions)
    .sort(([, a], [, b]) => a - b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
};
