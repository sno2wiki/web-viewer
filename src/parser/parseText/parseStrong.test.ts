import { parseStrong } from "./parseStrong";

describe("parseStrong()", () => {
  it("strongなし", () => {
    const actual = parseStrong("Example text");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_STRONG", text: "Example text" },
      ],
    );
  });

  it("シンプルなstrongのみ", () => {
    const actual = parseStrong("**strong**");
    expect(actual).toStrictEqual(
      [
        { type: "STRONG", text: "**strong**" },
      ],
    );
  });

  it("strongの前に文字列がある", () => {
    const actual = parseStrong("before **strong**");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_STRONG", text: "before " },
        { type: "STRONG", text: "**strong**" },
      ],
    );
  });

  it("strongの後に文字列がある", () => {
    const actual = parseStrong("**strong** after");
    expect(actual).toStrictEqual(
      [
        { type: "STRONG", text: "**strong**" },
        { type: "PARSED_MONOSPACE", text: " after" },
      ],
    );
  });

  it("strongの前後に文字列がある", () => {
    const actual = parseStrong("before **strong** after");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_STRONG", text: "before " },
        { type: "STRONG", text: "**strong**" },
        { type: "PARSED_MONOSPACE", text: " after" },
      ],
    );
  });
});
