import { BlockType, DisplayBlockUnion, ParsingBlockUnion } from "./types";

export const parser = (text: string): DisplayBlockUnion[] => {
  return parseRecursively({ type: "PURE", text }) as DisplayBlockUnion[];
};

export const parseRecursively = (block: ParsingBlockUnion): ParsingBlockUnion[] => {
  switch (block.type) {
    case "PURE":
      return parseRedirect(block.text)
        .reduce((prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block)], []);
    case "PARSED_REDIRECT":
      return parseMonospace(block.text)
        .reduce((prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block)], []);
    case "PARSED_MONOSPACE":
      return parseStrong(block.text)
        .reduce((prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block)], []);
    case "PARSED_STRONG":
      return parseItalic(block.text)
        .reduce((prev: ParsingBlockUnion[], block) => [...prev, ...parseRecursively(block)], []);
    case "PARSED_ITALIC":
      return [{ type: "PLAIN", text: block.text }];
    default:
      return [block];
  }
};

export const buildParser = (pattern: string, target: BlockType, before: BlockType, after: BlockType) =>
  (text: string): ParsingBlockUnion[] => {
    const result = new RegExp(pattern, "d").exec(text);
    if (result === null) return [{ type: before, text }];

    const extract = result[0];
    const indices: [number, number] = (result as any).indices[0];

    const redBlock = { type: target, text: extract };
    const befBlock = indices[0] === 0
      ? undefined
      : { type: before, text: text.slice(0, indices[0]) };
    const aftBlock = indices[1] === text.length
      ? undefined
      : { type: after, text: text.slice(indices[1]) };

    if (befBlock && aftBlock) return [befBlock, redBlock, aftBlock];
    else if (!befBlock && aftBlock) return [redBlock, aftBlock];
    else if (befBlock && !aftBlock) return [befBlock, redBlock];
    return [redBlock];
  };

export const parseRedirect = buildParser("\\[.*?=>.+?\\]", "REDIRECT", "PARSED_REDIRECT", "PURE");
export const parseMonospace = buildParser("\\`.+?\\`", "MONOSPACE", "PARSED_MONOSPACE", "PARSED_REDIRECT");
export const parseStrong = buildParser("\\*\\*.+?\\*\\*", "STRONG", "PARSED_STRONG", "PARSED_MONOSPACE");
export const parseItalic = buildParser("\\_\\_.+?\\_\\_", "ITALIC", "PARSED_ITALIC", "PARSED_STRONG");
