"use client";

import React from "react";
import { store } from "@/state/store";
import { setIsLoading } from "@/state/slices/loadingSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const Loading = ({ children }: { children: React.ReactNode }) => {
  const isLoading: boolean = useSelector(
    (state: RootState): boolean => state.isLoading,
  );
  return (
    <>
      {isLoading && (
        <div
          className={
            "w-screen h-screen absolute top-0 left-0 flex justify-center items-center"
          }
        >
          <div
            className={"w-full h-full absolute bg-gray-500 opacity-20"}
          ></div>
          <div className={"flex gap-x-2 z-30 opacity-100"}>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
      <div className={isLoading ? "blur-[1px]" : ""}>{children}</div>
    </>
  );
};

export const setLoading = (isLoading: boolean) => {
  store.dispatch(setIsLoading(isLoading));
};
export default Loading;
