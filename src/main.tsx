// One of the stupid libraries needs this!
import "regenerator-runtime/runtime";

import { createRoot } from "react-dom/client";
import Root from "./Root";

import "normalize.css";

async function render(Component: typeof Root, rootElement: HTMLElement) {
  const root = createRoot(rootElement);
  root.render(<Component />);
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element!");
}

render(Root, rootElement);

console.log(
  "%cSomeone, somewhere, is currently suckling on something intensively sucklable. This browser console can sense it.",
  "font-size: 3em"
);
