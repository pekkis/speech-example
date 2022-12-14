import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../theme.css";

globalStyle("html", {
  fontFamily: vars.font.body,
  fontSize: "18px",
  backgroundColor: "rgb(255, 200, 200)",
  backgroundImage: "url('/src/assets/duckling-pattern.png')"
});

globalStyle("body", {
  margin: 0,
  padding: 0,
  fontWeight: 400
});

globalStyle("strong", {
  fontWeight: 700
});

globalStyle("h2", {
  marginTop: "1em",
  marginBottom: "1em"
});

export const contentClass = style({
  maxWidth: "800px",
  margin: "1em auto",
  padding: "1em"
});

export const isUtteringClass = style({
  backgroundColor: "rgb(200, 200, 200)"
});

export const imgClass = style({
  maxWidth: "100%"
});
