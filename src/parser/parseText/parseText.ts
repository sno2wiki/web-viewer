import { parseDel, parseItalic, parseMonospace, parseRedirect, parseStrong, parseWavy } from "./parsers";
import { ContextsMap, DisplayBlockUnion, ParsingBlockUnion } from "./types";

export const parseText = (text: string, contexts: ContextsMap): DisplayBlockUnion[] => {
  return parseRecursively({ type: "PURE", text }, contexts) as DisplayBlockUnion[];
};

const parseRecursively = (block: ParsingBlockUnion, ctxMap: ContextsMap): ParsingBlockUnion[] => {
  switch (block.type) {
    case "PURE": {
      const { blocks, override } = parseRedirect(block.text, ctxMap);
      if (override) ctxMap.set(override.term, [...(ctxMap.get(override.term) || []), override.context]);
      return blocks.reduce((prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block, ctxMap)], []);
    }
    case "PARSED_REDIRECT":
      return parseMonospace(block.text)
        .reduce(
          (prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block as ParsingBlockUnion, ctxMap)],
          [],
        );
    case "PARSED_MONOSPACE":
      return parseStrong(block.text)
        .reduce(
          (prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block as ParsingBlockUnion, ctxMap)],
          [],
        );
    case "PARSED_STRONG":
      return parseItalic(block.text)
        .reduce(
          (prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block as ParsingBlockUnion, ctxMap)],
          [],
        );
    case "PARSED_ITALIC":
      return parseDel(block.text)
        .reduce(
          (prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block as ParsingBlockUnion, ctxMap)],
          [],
        );
    case "PARSED_DEL":
      return parseWavy(block.text)
        .reduce(
          (prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block as ParsingBlockUnion, ctxMap)],
          [],
        );
    case "PARSED_WAVY":
      return [{ type: "PLAIN", text: block.text }];
    default:
      return [block];
  }
};
