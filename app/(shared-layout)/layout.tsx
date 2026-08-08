import Header from "@/components/Header";
import React, { PropsWithChildren } from "react";

export default function SharedLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
