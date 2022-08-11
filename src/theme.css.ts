import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    brand: "blue"
  },
  font: {
    body: "Arial, sans-serif"
  }
});
