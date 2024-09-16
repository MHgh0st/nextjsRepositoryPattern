"use client";
import "../assets/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/state/store";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Provider>
  );
}
