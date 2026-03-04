import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalLoader from "./shared/components/GlobalLoader";
import AppRouter from "./app/routes/AppRouter";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  );
}
