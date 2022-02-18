import { parseItalic, parseMonospace, parseRedirect, parseStrong } from "./parser";

describe("parseRedirect()", () => {
  it("リダイレクトなし", () => {
    const actual = parseRedirect("Example text");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_REDIRECT", text: "Example text" },
      ],
    );
  });

  it("シンプルなリダイレクト1つのみ", () => {
    const actual = parseRedirect("[context=>term]");
    expect(actual).toStrictEqual(
      [
        { type: "REDIRECT", text: "[context=>term]" },
      ],
    );
  });

  it("リダイレクトの前に文字列がある", () => {
    const actual = parseRedirect("before [context=>term]");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_REDIRECT", text: "before " },
        { type: "REDIRECT", text: "[context=>term]" },
      ],
    );
  });

  it("リダイレクトの後に文字列がある", () => {
    const actual = parseRedirect("[context=>term] after");
    expect(actual).toStrictEqual(
      [
        { type: "REDIRECT", text: "[context=>term]" },
        { type: "PURE", text: " after" },
      ],
    );
  });

  it("リダイレクトの前後に文字列がある", () => {
    const actual = parseRedirect("before [context=>term] after");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_REDIRECT", text: "before " },
        { type: "REDIRECT", text: "[context=>term]" },
        { type: "PURE", text: " after" },
      ],
    );
  });
});

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
        { type: "PARSED_REDIRECT", text: " after" },
      ],
    );
  });

  it("strongの前後に文字列がある", () => {
    const actual = parseStrong("before **strong** after");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_STRONG", text: "before " },
        { type: "STRONG", text: "**strong**" },
        { type: "PARSED_REDIRECT", text: " after" },
      ],
    );
  });
});

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
    const actual = parseItalic("`italic`");
    expect(actual).toStrictEqual(
      [
        { type: "ITALIC", text: "`italic`" },
      ],
    );
  });

  it("italicの前に文字列がある", () => {
    const actual = parseItalic("before `italic`");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_ITALIC", text: "before " },
        { type: "ITALIC", text: "`italic`" },
      ],
    );
  });

  it("italicの後に文字列がある", () => {
    const actual = parseItalic("`italic` after");
    expect(actual).toStrictEqual(
      [
        { type: "ITALIC", text: "`italic`" },
        { type: "PARSED_STRONG", text: " after" },
      ],
    );
  });

  it("italicの前後に文字列がある", () => {
    const actual = parseItalic("before `italic` after");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_ITALIC", text: "before " },
        { type: "ITALIC", text: "`italic`" },
        { type: "PARSED_STRONG", text: " after" },
      ],
    );
  });
});

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
        { type: "PARSED_STRONG", text: " after" },
      ],
    );
  });

  it("monospaceの前後に文字列がある", () => {
    const actual = parseItalic("before `monospace` after");
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_MONOSPACE", text: "before " },
        { type: "MONOSPACE", text: "`monospace`" },
        { type: "PARSED_STRONG", text: " after" },
      ],
    );
  });
});
