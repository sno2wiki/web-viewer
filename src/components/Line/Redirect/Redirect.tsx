import { css, cx } from "@emotion/css";

export const replaceSpace = (term: string) => term.replace(/ /g, "_");

export const Redirect: React.VFC<
  & { text: string; }
  & (
    | { context: null; term: string; }
    | { context: string; term: string; implict: boolean; }
  )
> = (
  { text, ...redirect },
) => {
  if (!redirect.context) {
    return (
      <a
        href={`/redirect/_/${redirect.term}`}
        className={css({ color: "red" })}
      >
        {text}
      </a>
    );
  }
  return (
    <a
      href={`/redirect/${redirect.context}/${redirect.term}`}
      className={cx(
        css({ color: "blue" }),
        !redirect.implict && css({ fontWeight: "bold" }),
      )}
    >
      {text}
    </a>
  );
};
