import { parseItalic, parseMonospace, parseRedirect, parseStrong } from "./parsers";

describe("parseRedirect()", () => {
  it("リダイレクトなし", () => {
    const actual = parseRedirect("Example text", new Map());
    expect(actual.blocks).toStrictEqual(
      [
        { type: "PARSED_REDIRECT", text: "Example text" },
      ],
    );
  });

  describe("自明のcontextを持つ", () => {
    it("シンプルなリダイレクト1つのみ", () => {
      const actual = parseRedirect("[context=>term]", new Map());
      expect(actual.blocks).toStrictEqual(
        [
          { type: "REDIRECT", text: "[context=>term]", context: "context", term: "term", implict: false },
        ],
      );
    });

    it("リダイレクトの前に文字列がある", () => {
      const actual = parseRedirect("before [context=>term]", new Map());
      expect(actual.blocks).toStrictEqual(
        [
          { type: "PARSED_REDIRECT", text: "before " },
          { type: "REDIRECT", text: "[context=>term]", context: "context", term: "term", implict: false },
        ],
      );
    });

    it("リダイレクトの後に文字列がある", () => {
      const actual = parseRedirect("[context=>term] after", new Map());
      expect(actual.blocks).toStrictEqual(
        [
          { type: "REDIRECT", text: "[context=>term]", context: "context", term: "term", implict: false },
          { type: "PURE", text: " after" },
        ],
      );
    });

    it("リダイレクトの前後に文字列がある", () => {
      const actual = parseRedirect("before [context=>term] after", new Map());
      expect(actual.blocks).toStrictEqual(
        [
          { type: "PARSED_REDIRECT", text: "before " },
          { type: "REDIRECT", text: "[context=>term]", context: "context", term: "term", implict: false },
          { type: "PURE", text: " after" },
        ],
      );
    });
  });

  describe("自明のcontextを持たないが，暗黙のcontextがある", () => {
    it("シンプルなリダイレクト1つのみ", () => {
      const actual = parseRedirect("[=>term]", new Map([["term", ["implict"]]]));
      expect(actual.blocks).toStrictEqual(
        [
          { type: "REDIRECT", text: "[=>term]", context: "implict", term: "term", implict: true },
        ],
      );
    });

    it("リダイレクトの前に文字列がある", () => {
      const actual = parseRedirect("before [=>term]", new Map([["term", ["implict"]]]));
      expect(actual.blocks).toStrictEqual(
        [
          { type: "PARSED_REDIRECT", text: "before " },
          { type: "REDIRECT", text: "[=>term]", context: "implict", term: "term", implict: true },
        ],
      );
    });

    it("リダイレクトの後に文字列がある", () => {
      const actual = parseRedirect("[=>term] after", new Map([["term", ["implict"]]]));
      expect(actual.blocks).toStrictEqual(
        [
          { type: "REDIRECT", text: "[=>term]", context: "implict", term: "term", implict: true },
          { type: "PURE", text: " after" },
        ],
      );
    });

    it("リダイレクトの前後に文字列がある", () => {
      const actual = parseRedirect("before [=>term] after", new Map([["term", ["implict"]]]));
      expect(actual.blocks).toStrictEqual(
        [
          { type: "PARSED_REDIRECT", text: "before " },
          { type: "REDIRECT", text: "[=>term]", context: "implict", term: "term", implict: true },
          { type: "PURE", text: " after" },
        ],
      );
    });
  });

  describe("自明のcontextを持たず，かつ暗黙のcontextが無い", () => {
    it("シンプルなリダイレクト1つのみ", () => {
      const actual = parseRedirect("[=>term]", new Map());
      expect(actual.blocks).toStrictEqual(
        [
          { type: "REDIRECT", text: "[=>term]", context: null, term: "term" },
        ],
      );
    });

    it("リダイレクトの前に文字列がある", () => {
      const actual = parseRedirect("before [=>term]", new Map());
      expect(actual.blocks).toStrictEqual(
        [
          { type: "PARSED_REDIRECT", text: "before " },
          { type: "REDIRECT", text: "[=>term]", context: null, term: "term" },
        ],
      );
    });

    it("リダイレクトの後に文字列がある", () => {
      const actual = parseRedirect("[=>term] after", new Map());
      expect(actual.blocks).toStrictEqual(
        [
          { type: "REDIRECT", text: "[=>term]", context: null, term: "term" },
          { type: "PURE", text: " after" },
        ],
      );
    });

    it("リダイレクトの前後に文字列がある", () => {
      const actual = parseRedirect("before [=>term] after", new Map());
      expect(actual.blocks).toStrictEqual(
        [
          { type: "PARSED_REDIRECT", text: "before " },
          { type: "REDIRECT", text: "[=>term]", context: null, term: "term" },
          { type: "PURE", text: " after" },
        ],
      );
    });
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
