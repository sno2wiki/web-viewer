import { buildDecoParser } from "./buildDecoParser";

export const parseMonospace = buildDecoParser("\\`.+?\\`", "MONOSPACE", "PARSED_MONOSPACE", "PARSED_REDIRECT");
