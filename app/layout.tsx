"use client";
import "../assets/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/state/store";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="fa" dir="rtl">
        <body>{children}</body>
      </html>
    </Provider>
  );
}
