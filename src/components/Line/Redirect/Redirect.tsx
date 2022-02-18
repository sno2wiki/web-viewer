import { css } from "@emotion/css";
import { useMemo } from "react";

export const replaceSpace = (term: string) => term.replace(/ /g, "_");

export const Redirect: React.VFC<
  {
    text: string;
    findContext(term: string): string | null;
  }
> = (
  { text, findContext },
) => {
  const parsed = useMemo<
    | null
    | { context: null; term: string; }
    | { context: string; term: string; }
  >(() => {
    const splited = /^\[(.*?)=>(.+?)\]$/.exec(text)!;
    if (!splited || splited.length !== 3) return null;
    if (splited[1] === "") return { context: null, term: replaceSpace(splited[2]) };
    return { context: splited[1], term: replaceSpace(splited[2]) };
  }, [text]);

  const actualContext = useMemo(
    () => {
      if (!parsed) return null;
      if (parsed.context) return parsed.context;
      return findContext(parsed.term);
    },
    [findContext, parsed],
  );
  const actualTerm = useMemo(
    () => parsed && parsed.term,
    [parsed],
  );

  const href = useMemo(() => {
    if (!actualTerm) return null;
    if (!actualContext) return `/redirect/_/${actualTerm}`;
    return `/redirect/${actualContext}/${actualTerm}`;
  }, [actualContext, actualTerm]);

  if (!href) return <a className={css({ color: "red" })}>{text}</a>;
  return <a className={css({ color: "blue" })} href={href}>{text}</a>;
};
