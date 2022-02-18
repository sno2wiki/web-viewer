import { ContextsMap, ParsedRedirectBlock, ParsingBlockUnion, PureBlock, RedirectBlock } from "./types";

export const getStoredContext = (term: string, map: ContextsMap): string | null => {
  const cands = map.get(term);
  if (!cands || cands.size !== 1) return null;
  else return [...cands][0];
};

export const parseRedirect = (
  text: string,
  contexts: ContextsMap,
): ParsingBlockUnion[] => {
  const result = new RegExp("\\[.*?=>.+?\\]", "d").exec(text);
  if (result === null) {
    return [{ type: "PARSED_REDIRECT", text }];
  }

  const extract = result[0];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [, preContext, preTerm] = /\[(.*?)=>(.*?)\]/.exec(extract)!;
  const term = preTerm.replace(/ /g, "_");
  const context = preContext === "" ? getStoredContext(term, contexts) : preContext;
  const redBlock: RedirectBlock = context
    ? { type: "REDIRECT", text: extract, context, term, implict: preContext === "" }
    : { type: "REDIRECT", text: extract, context: null, term };

  const indices: [number, number] = (result as any).indices[0];
  const befBlock: ParsedRedirectBlock | undefined = indices[0] === 0
    ? undefined
    : { type: "PARSED_REDIRECT", text: text.slice(0, indices[0]) };
  const aftBlock: PureBlock | undefined = indices[1] === text.length
    ? undefined
    : { type: "PURE", text: text.slice(indices[1]) };

  if (befBlock && aftBlock) {
    return [befBlock, redBlock, aftBlock];
  } else if (!befBlock && aftBlock) {
    return [redBlock, aftBlock];
  } else if (befBlock && !aftBlock) {
    return [befBlock, redBlock];
  }
  return [redBlock];
};
