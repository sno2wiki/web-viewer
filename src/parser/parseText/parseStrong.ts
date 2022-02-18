import { buildDecoParser } from "./buildDecoParser";

export const parseStrong = buildDecoParser("\\*\\*.+?\\*\\*", "STRONG", "PARSED_STRONG", "PARSED_MONOSPACE");
