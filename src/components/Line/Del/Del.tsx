import { css } from "@emotion/css";

export const Del: React.VFC<{ text: string; }> = ({ text }) => {
  return <del className={css({ textDecoration: "line-through" })}>{text}</del>;
};
