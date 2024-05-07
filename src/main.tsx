import ReactDOM from "react-dom/client";
import App from "./Pages/App/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/index.ts";
import { Provider } from "react-redux";
import Loading from "./components/Loading/Loading.tsx";
import { LazyMoviePage } from "./Pages/MoviePage/MoviePage.lazy.tsx";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Routes>
          <Route path="/movies" element={<App />} />
          <Route path="*" element={<App />} />
          <Route
            path="/movies/:title"
            element={
              <Suspense fallback={<Loading />}>
                <LazyMoviePage />
              </Suspense>
            }
          />
        </Routes>
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
