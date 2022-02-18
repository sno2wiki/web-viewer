import { parseItalic } from "./parseItalic";
import { parseMonospace } from "./parseMonospace";
import { parseRedirect } from "./parseRedirect";
import { parseStrong } from "./parseStrong";
import { ContextsMap, DisplayBlockUnion, ParsingBlockUnion } from "./types";

export const parseText = (text: string, contexts: ContextsMap): DisplayBlockUnion[] => {
  return parseRecursively({ type: "PURE", text }, contexts) as DisplayBlockUnion[];
};

const parseRecursively = (block: ParsingBlockUnion, contexts: ContextsMap): ParsingBlockUnion[] => {
  switch (block.type) {
    case "PURE":
      return parseRedirect(block.text, contexts)
        .reduce((prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block, contexts)], []);
    case "PARSED_REDIRECT":
      return parseMonospace(block.text)
        .reduce((prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block, contexts)], []);
    case "PARSED_MONOSPACE":
      return parseStrong(block.text)
        .reduce((prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block, contexts)], []);
    case "PARSED_STRONG":
      return parseItalic(block.text)
        .reduce((prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block, contexts)], []);
    case "PARSED_ITALIC":
      return [{ type: "PLAIN", text: block.text }];
    default:
      return [block];
  }
};
