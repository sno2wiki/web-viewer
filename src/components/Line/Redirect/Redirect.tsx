import { css, cx } from "@emotion/css";

export const replaceSpace = (term: string) => term.replace(/ /g, "_");

export const Redirect: React.VFC<
  & { text: string; }
  & (
    | { context: null; term: string; }
    | { context: string; term: string; implict: boolean; color: number; }
  )
> = (
  { text, ...redirect },
) => {
  if (!redirect.context) {
    return (
      <a
        href={`/redirects/_/${redirect.term}`}
        className={css({ color: "red" })}
      >
        {text}
      </a>
    );
  }
  return (
    <a
      href={`/redirects/${redirect.context}/${redirect.term}`}
      className={cx(
        css({ padding: "2px 2px" }),
        !redirect.implict && css({ fontWeight: 700 }),
        redirect.color % 4 === 0 && css({ color: "hsl(205, 80%, 60%)", backgroundColor: "hsla(205, 90%, 75%, 0.2)" }),
        redirect.color % 4 === 1 && css({ color: "hsl(215, 80%, 60%)", backgroundColor: "hsla(215, 90%, 75%, 0.2)" }),
        redirect.color % 4 === 2 && css({ color: "hsl(225, 80%, 60%)", backgroundColor: "hsla(225, 90%, 75%, 0.2)" }),
        redirect.color % 4 === 3 && css({ color: "hsl(235, 80%, 60%)", backgroundColor: "hsla(235, 90%, 75%, 0.2)" }),
      )}
    >
      {text}
    </a>
  );
};
