import { css } from "@emotion/css";
import React from "react";

import { Line } from "./components/Line";
import { Line as LineType } from "./types";

export const Viewer: React.VFC<{ lines: LineType[]; }> = (
  { lines },
) => {
  return (
    <div className={css({})}>
      {lines.map(({ id, text }) => <Line key={id} lineId={id} text={text} />)}
    </div>
  );
};
