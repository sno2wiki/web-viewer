import { css } from "@emotion/css";

export const Wavy: React.VFC<{ text: string; }> = ({ text }) => {
  return <span className={css({ textDecoration: "wavy underline" })}>{text}</span>;
};
