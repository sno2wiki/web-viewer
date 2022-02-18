import { css } from "@emotion/css";
import React, { useMemo } from "react";

import { Line } from "./components/Line";
import { parseLines } from "./parser";
import { Line as LineType } from "./types";

export const Viewer: React.VFC<{ lines: LineType[]; }> = (
  { lines },
) => {
  const parsed = useMemo(() => parseLines(lines, new Map()), [lines]);
  /*
  const contextsMap = useMemo(
    () =>
      (lines
        .map((line) =>
          line.text
            .match(/\[.*?=>.+?\]/g)
            ?.map((redirect) => /\[(.*?)\=>(.*?)\]/.exec(redirect)!)
            .map(([, context, term]) => ({ context, term: term.replace(/ /g, "_") }))
            .filter(({ context }) => context !== "")
        )
        .filter((pairs) => pairs && 0 < pairs.length)
        .flat() as { context: string; term: string; }[])
        .reduce(
          (prev, { context, term }) => prev.set(term, (prev.get(term) || new Set()).add(context)),
          new Map<string, Set<string>>(),
        ),
    [lines],
  );

  const findContext = useCallback<
    (term: string) => string | null
  >((term: string) => {
    const cands = contextsMap.get(term);

    if (!cands || cands.size !== 1) return null;
    else return [...cands][0];
  }, [contextsMap]);
  */

  return (
    <div className={css({})}>
      {parsed.map(({ id, blocks }) => <Line key={id} lineId={id} blocks={blocks} />)}
      {/* lines.map(({ id, text }) => <Line key={id} lineId={id} text={text} findContext={findContext} />) */}
    </div>
  );
};
