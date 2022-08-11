import { FC } from "react";
import App from "./components/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

const Root: FC = () => {
  // All React components must return one thing. A fragment (the empty tag <>) is such "one thing" that has no markup.
  return (
    <>
      <ErrorBoundary fallback={<div>OH NOES ERROROS TERRIBLOS</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}></Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
};

export default Root;
