import { ContextsMap, ParsedRedirectBlock, ParsingBlockUnion, PureBlock, RedirectBlock } from "./types";

export const getRedirect = (preTerm: string, preContext: string, ctxMap: ContextsMap): {
  block:
    | { context: null; term: string; }
    | { context: string; term: string; color: number; implict: true; }
    | { context: string; term: string; color: number; implict: false; };
  override?: { term: string; context: string; };
} => {
  const term = preTerm.replace(/ /g, "_");
  const context = preContext === "" ? null : preContext.replace(/ /g, "_");

  const array = ctxMap.get(term);
  if (!array || array.length === 0) {
    if (!context) {
      return { block: { context: null, term } };
    } else {
      return { block: { context, term, implict: false, color: 0 }, override: { term, context } };
    }
  } else {
    if (!context) {
      return { block: { context: array[array.length - 1], term, implict: true, color: array.length - 1 } };
    } else if (array[array.length - 1] !== context) {
      return { block: { context, term, implict: false, color: array.length }, override: { term, context } };
    } else {
      return { block: { context, term, implict: false, color: array.length - 1 } };
    }
  }
};

export const parseRedirect = (
  text: string,
  ctxMap: ContextsMap,
): {
  blocks: ParsingBlockUnion[];
  override?: { term: string; context: string; };
} => {
  const result = new RegExp("\\[.*?=>.+?\\]", "d").exec(text);
  if (result === null) {
    return { blocks: [{ type: "PARSED_REDIRECT", text }] };
  }

  const extract = result[0];

  const indices: [number, number] = (result as any).indices[0];
  const befBlock: ParsedRedirectBlock | undefined = indices[0] === 0
    ? undefined
    : { type: "PARSED_REDIRECT", text: text.slice(0, indices[0]) };
  const aftBlock: PureBlock | undefined = indices[1] === text.length
    ? undefined
    : { type: "PURE", text: text.slice(indices[1]) };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [, preContext, preTerm] = /\[(.*?)=>(.*?)\]/.exec(extract)!;
  const { block, override } = getRedirect(preTerm, preContext, ctxMap);
  const redBlock: RedirectBlock = { type: "REDIRECT", text: extract, ...block };

  const blocks = befBlock && aftBlock
    ? [befBlock, redBlock, aftBlock]
    : !befBlock && aftBlock
    ? [redBlock, aftBlock]
    : befBlock && !aftBlock
    ? [befBlock, redBlock]
    : [redBlock];

  return { blocks, override };
};
