import { buildDecoParser } from "./buildDecoParser";

export const parseDel = buildDecoParser("\\-\\-.+?\\-\\-", "DEL", "PARSED_DEL", `PARSED_ITALIC`);
