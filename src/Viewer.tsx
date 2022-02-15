import { css } from "@emotion/css";
import React, { Fragment } from "react";

import { Line } from "./types";

export const Viewer: React.VFC<{ lines: Line[]; }> = (
  { lines },
) => {
  return (
    <div className={css({ overflow: "hidden" })}>
      {lines.map(({ id, text }) => (
        <Fragment key={id}>
          <p>{text}</p>
        </Fragment>
      ))}
    </div>
  );
};
