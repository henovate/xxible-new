"use client";

import { Provider } from "react-redux";
import store from "../store/store";
import { AppDataProvider } from "@/context/AppDataContext";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AppDataProvider>{children}</AppDataProvider>
    </Provider>
  );
};

export default ClientWrapper;
