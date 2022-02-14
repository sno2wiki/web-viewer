import { css } from "@emotion/css";
import React from "react";

import { Line } from "./types";

export const Viewer: React.VFC<{ lines: Line[]; }> = (
  { lines },
) => {
  return (
    <div className={css({ overflow: "hidden" })}>
      <p>{JSON.stringify(lines)}</p>
    </div>
  );
};
