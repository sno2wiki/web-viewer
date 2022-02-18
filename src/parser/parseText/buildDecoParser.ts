import {
  ItalicBlock,
  MonospaceBlock,
  ParsedItalicBlock,
  ParsedMonospaceBlock,
  ParsedRedirectBlock,
  ParsedStrongBlock,
  ParsingBlockUnion,
  StrongBlock,
} from "./types";

export const buildDecoParser = (
  pattern: string,
  target: (MonospaceBlock | StrongBlock | ItalicBlock)["type"],
  before: (ParsedRedirectBlock | ParsedMonospaceBlock | ParsedStrongBlock | ParsedItalicBlock)["type"],
  after: (ParsedRedirectBlock | ParsedMonospaceBlock | ParsedStrongBlock | ParsedItalicBlock)["type"],
) =>
  (text: string): ParsingBlockUnion[] => {
    const result = new RegExp(pattern, "d").exec(text);
    if (result === null) {
      return [{ type: before, text }];
    }

    const extract = result[0];
    const indices: [number, number] = (result as any).indices[0];

    const redBlock = { type: target, text: extract };
    const befBlock = indices[0] === 0
      ? undefined
      : { type: before, text: text.slice(0, indices[0]) };
    const aftBlock = indices[1] === text.length
      ? undefined
      : { type: after, text: text.slice(indices[1]) };

    if (befBlock && aftBlock) {
      return [befBlock, redBlock, aftBlock];
    } else if (!befBlock && aftBlock) {
      return [redBlock, aftBlock];
    } else if (befBlock && !aftBlock) {
      return [befBlock, redBlock];
    }
    return [redBlock];
  };
