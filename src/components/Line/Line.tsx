import { css } from "@emotion/css";
import { Fragment } from "react";

import { DisplayBlockUnion } from "~/parser";

import { Del } from "./Del";
import { Italic } from "./Italic";
import { Monospace } from "./Monospace";
import { Plain } from "./Plain";
import { Redirect } from "./Redirect";
import { Strong } from "./Strong";
import { Wavy } from "./Wavy";

export const Line: React.VFC<{
  lineId: string;
  blocks: DisplayBlockUnion[];
}> = ({ lineId, blocks }) => {
  return (
    <div id={lineId} className={css({ fontFamily: "sans-serif" })}>
      <p className={css({ display: "inline-block" })}>
        {blocks.map((block, i) => (
          <Fragment key={i}>
            {block.type === "REDIRECT" && <Redirect {...block} />}
            {block.type === "MONOSPACE" && <Monospace {...block} />}
            {block.type === "STRONG" && <Strong {...block} />}
            {block.type === "ITALIC" && <Italic {...block} />}
            {block.type === "DEL" && <Del {...block} />}
            {block.type === "WAVY" && <Wavy {...block} />}
            {block.type === "PLAIN" && <Plain {...block} />}
          </Fragment>
        ))}
      </p>
    </div>
  );
};
