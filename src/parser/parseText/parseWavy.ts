import { buildDecoParser } from "./buildDecoParser";

export const parseWavy = buildDecoParser("\\~\\~.+?\\~\\~", "WAVY", "PARSED_WAVY", `PARSED_DEL`);
