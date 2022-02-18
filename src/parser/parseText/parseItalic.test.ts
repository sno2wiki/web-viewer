import { parseItalic } from "./parseItalic";

describe("parseItalic()", () => {
  it("italicなし", () => {
    const actual = parseItalic("Example text");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_ITALIC", text: "Example text" },
      ],
    );
  });

  it("シンプルなitalicのみ", () => {
    const actual = parseItalic("__italic__");
    expect(actual).toStrictEqual(
      [
        { type: "ITALIC", text: "__italic__" },
      ],
    );
  });

  it("italicの前に文字列がある", () => {
    const actual = parseItalic("before __italic__");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_ITALIC", text: "before " },
        { type: "ITALIC", text: "__italic__" },
      ],
    );
  });

  it("italicの後に文字列がある", () => {
    const actual = parseItalic("__italic__ after");
    expect(actual).toStrictEqual(
      [
        { type: "ITALIC", text: "__italic__" },
        { type: "PARSED_STRONG", text: " after" },
      ],
    );
  });

  it("italicの前後に文字列がある", () => {
    const actual = parseItalic("before __italic__ after");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_ITALIC", text: "before " },
        { type: "ITALIC", text: "__italic__" },
        { type: "PARSED_STRONG", text: " after" },
      ],
    );
  });
});
