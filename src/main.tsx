import ReactDOM from "react-dom/client";
import App from "./Pages/App/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/index.ts";
import { Provider } from "react-redux";
import Loading from "./components/Loading/Loading.tsx";
import { LazyMoviePage } from "./Pages/MoviePage/MoviePage.lazy.tsx";
import { Suspense } from "react";
import { LazyAccount } from "./Pages/Account/Account.lazy.tsx";
import Login from "./Pages/Login/Login.tsx";
import { LazyLogin } from "./Pages/Login/Login.lazy.tsx";
import { LazyRegister } from "./Pages/Register/Register.lazy.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter basename="/Movies/">
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
          <Route
            path="/account"
            element={
              <Suspense fallback={<Loading />}>
                <LazyAccount />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Login />}>
                <LazyLogin />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Login />}>
                <LazyRegister />
              </Suspense>
            }
          />
        </Routes>
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
