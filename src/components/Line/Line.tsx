import { css } from "@emotion/css";
import { Fragment, useMemo } from "react";

import { parser } from "~/parser";

import { Italic } from "./Italic";
import { Monospace } from "./Monospace";
import { Plain } from "./Plain";
import { Redirect } from "./Redirect";
import { Strong } from "./Strong";

export const Line: React.VFC<{
  lineId: string;
  text: string;
  findContext(term: string): string | null;
}> = ({ lineId, text, findContext }) => {
  const blocks = useMemo(() => parser(text), [text]);

  return (
    <div id={lineId} className={css({ fontFamily: "sans-serif" })}>
      <p className={css({ display: "inline-block" })}>
        {blocks.map((block, i) => (
          <Fragment key={i}>
            {block.type === "REDIRECT" && <Redirect text={block.text} findContext={findContext} />}
            {block.type === "MONOSPACE" && <Monospace text={block.text} />}
            {block.type === "STRONG" && <Strong text={block.text} />}
            {block.type === "ITALIC" && <Italic text={block.text} />}
            {block.type === "PLAIN" && <Plain text={block.text} />}
          </Fragment>
        ))}
      </p>
    </div>
  );
};
