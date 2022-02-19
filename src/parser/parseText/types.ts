export type ContextsMap = Map<string, string[]>;

export type PureBlock = { type: "PURE"; text: string; };

export type ParsedRedirectBlock = { type: "PARSED_REDIRECT"; text: string; };
export type RedirectBlock =
  & { type: "REDIRECT"; text: string; }
  & (
    | { context: null; term: string; } // contextがわからない
    | { context: string; term: string; color: number; implict: true; } // 暗黙のcontextがある
    | { context: string; term: string; color: number; implict: false; } // 自明のcontextがある
  );

export type ParsedMonospaceBlock = { type: "PARSED_MONOSPACE"; text: string; };
export type MonospaceBlock = { type: "MONOSPACE"; text: string; };

export type ParsedStrongBlock = { type: "PARSED_STRONG"; text: string; };
export type StrongBlock = { type: "STRONG"; text: string; };

export type ParsedItalicBlock = { type: "PARSED_ITALIC"; text: string; };
export type ItalicBlock = { type: "ITALIC"; text: string; };

export type ParsedDelBlock = { type: "PARSED_DEL"; text: string; };
export type DelBlock = { type: "DEL"; text: string; };

export type ParsedWavyBlock = { type: "PARSED_WAVY"; text: string; };
export type WavyBlock = { type: "WAVY"; text: string; };

export type PlainBlock = { type: "PLAIN"; text: string; };

export type DisplayBlockUnion =
  | RedirectBlock
  | MonospaceBlock
  | StrongBlock
  | ItalicBlock
  | DelBlock
  | WavyBlock
  | PlainBlock;
export type ParsingBlockUnion =
  | PureBlock
  | ParsedRedirectBlock
  | ParsedMonospaceBlock
  | ParsedStrongBlock
  | ParsedItalicBlock
  | ParsedDelBlock
  | ParsedWavyBlock
  | DisplayBlockUnion;
export type BlockType = ParsingBlockUnion["type"];
