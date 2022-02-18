import { buildDecoParser } from "./buildDecoParser";

export const parseItalic = buildDecoParser("\\_\\_.+?\\_\\_", "ITALIC", "PARSED_ITALIC", "PARSED_STRONG");
