import { parseMonospace } from "./parseMonospace";

describe("parseMonospace()", () => {
  it("monospaceなし", () => {
    const actual = parseMonospace("Example text");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_MONOSPACE", text: "Example text" },
      ],
    );
  });

  it("シンプルなmonospaceのみ", () => {
    const actual = parseMonospace("`monospace`");
    expect(actual).toStrictEqual(
      [
        { type: "MONOSPACE", text: "`monospace`" },
      ],
    );
  });

  it("monospaceの前に文字列がある", () => {
    const actual = parseMonospace("before `monospace`");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_MONOSPACE", text: "before " },
        { type: "MONOSPACE", text: "`monospace`" },
      ],
    );
  });

  it("monospaceの後に文字列がある", () => {
    const actual = parseMonospace("`monospace` after");
    expect(actual).toStrictEqual(
      [
        { type: "MONOSPACE", text: "`monospace`" },
        { type: "PARSED_REDIRECT", text: " after" },
      ],
    );
  });

  it("monospaceの前後に文字列がある", () => {
    const actual = parseMonospace("before `monospace` after");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_MONOSPACE", text: "before " },
        { type: "MONOSPACE", text: "`monospace`" },
        { type: "PARSED_REDIRECT", text: " after" },
      ],
    );
  });
});
