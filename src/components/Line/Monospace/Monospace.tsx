import { css } from "@emotion/css";

export const Monospace: React.VFC<{ text: string; }> = ({ text }) => {
  return <code className={css({ fontFamily: "monospace" })}>{text}</code>;
};
