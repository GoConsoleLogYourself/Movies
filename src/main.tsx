import ReactDOM from "react-dom/client";
import App from "./Pages/App/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/index.ts";
import { Provider } from "react-redux";
import Loading from "./components/Loading/Loading.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={<Loading/>} persistor={persistor}>
        <Routes>
          <Route path="*" element={<App />} />
          <Route path="main" element={<App />} />
        </Routes>
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
