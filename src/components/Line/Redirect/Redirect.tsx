import { css } from "@emotion/css";

export const Redirect: React.VFC<{ text: string; }> = ({ text }) => {
  return <a className={css({ color: "blue" })}>{text}</a>;
};
