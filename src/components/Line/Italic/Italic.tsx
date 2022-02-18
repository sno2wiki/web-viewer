import { css } from "@emotion/css";

export const Italic: React.VFC<{ text: string; }> = ({ text }) => {
  return <i className={css({ fontStyle: "italic" })}>{text}</i>;
};
