import { parseRedirect } from "./parseRedirect";

describe("parseRedirect()", () => {
  it("リダイレクトなし", () => {
    const actual = parseRedirect("Example text", new Map());
    expect(actual).toStrictEqual(
      [
        { type: "PARSED_REDIRECT", text: "Example text" },
      ],
    );
  });

  describe("自明のcontextを持つ", () => {
    it("シンプルなリダイレクト1つのみ", () => {
      const actual = parseRedirect("[context=>term]", new Map());
      expect(actual).toStrictEqual(
        [
          { type: "REDIRECT", text: "[context=>term]", context: "context", term: "term", implict: false },
        ],
      );
    });

    it("リダイレクトの前に文字列がある", () => {
      const actual = parseRedirect("before [context=>term]", new Map());
      expect(actual).toStrictEqual(
        [
          { type: "PARSED_REDIRECT", text: "before " },
          { type: "REDIRECT", text: "[context=>term]", context: "context", term: "term", implict: false },
        ],
      );
    });

    it("リダイレクトの後に文字列がある", () => {
      const actual = parseRedirect("[context=>term] after", new Map());
      expect(actual).toStrictEqual(
        [
          { type: "REDIRECT", text: "[context=>term]", context: "context", term: "term", implict: false },
          { type: "PURE", text: " after" },
        ],
      );
    });

    it("リダイレクトの前後に文字列がある", () => {
      const actual = parseRedirect("before [context=>term] after", new Map());
      expect(actual).toStrictEqual(
        [
          { type: "PARSED_REDIRECT", text: "before " },
          { type: "REDIRECT", text: "[context=>term]", context: "context", term: "term", implict: false },
          { type: "PURE", text: " after" },
        ],
      );
    });
  });

  describe("自明のcontextを持たず，かつ，対応するcontextMapが無い", () => {
    it("シンプルなリダイレクト1つのみ", () => {
      const actual = parseRedirect("[=>term]", new Map());
      expect(actual).toStrictEqual(
        [
          { type: "REDIRECT", text: "[=>term]", context: null, term: "term" },
        ],
      );
    });

    it("リダイレクトの前に文字列がある", () => {
      const actual = parseRedirect("before [=>term]", new Map());
      expect(actual).toStrictEqual(
        [
          { type: "PARSED_REDIRECT", text: "before " },
          { type: "REDIRECT", text: "[=>term]", context: null, term: "term" },
        ],
      );
    });

    it("リダイレクトの後に文字列がある", () => {
      const actual = parseRedirect("[=>term] after", new Map());
      expect(actual).toStrictEqual(
        [
          { type: "REDIRECT", text: "[=>term]", context: null, term: "term" },
          { type: "PURE", text: " after" },
        ],
      );
    });

    it("リダイレクトの前後に文字列がある", () => {
      const actual = parseRedirect("before [=>term] after", new Map());
      expect(actual).toStrictEqual(
        [
          { type: "PARSED_REDIRECT", text: "before " },
          { type: "REDIRECT", text: "[=>term]", context: null, term: "term" },
          { type: "PURE", text: " after" },
        ],
      );
    });
  });
});
