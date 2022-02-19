import {
  DelBlock,
  ItalicBlock,
  MonospaceBlock,
  ParsedDelBlock,
  ParsedItalicBlock,
  ParsedMonospaceBlock,
  ParsedRedirectBlock,
  ParsedStrongBlock,
  ParsedWavyBlock,
  ParsingBlockUnion,
  StrongBlock,
  WavyBlock,
} from "./types";

export const buildDecoParser2 = (block: DelBlock) => {
  return buildDecoParser("\\~\\~.+?\\~\\~", "WAVY", "PARSED_WAVY", `PARSED_${block.type}`);
};

export const buildDecoParser = (
  pattern: string,
  target: (MonospaceBlock | StrongBlock | ItalicBlock | DelBlock | WavyBlock)["type"],
  before: (
    | ParsedRedirectBlock
    | ParsedMonospaceBlock
    | ParsedStrongBlock
    | ParsedItalicBlock
    | ParsedDelBlock
    | ParsedWavyBlock
  )["type"],
  after: (
    | ParsedRedirectBlock
    | ParsedMonospaceBlock
    | ParsedStrongBlock
    | ParsedItalicBlock
    | ParsedDelBlock
    | ParsedWavyBlock
  )["type"],
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
