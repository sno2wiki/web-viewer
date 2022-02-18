import { css } from "@emotion/css";

export const Strong: React.VFC<{ text: string; }> = ({ text }) => {
  return <strong className={css({ fontWeight: "bold" })}>{text}</strong>;
};
