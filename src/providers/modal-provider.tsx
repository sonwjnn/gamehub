"use client";

import { useOrigin } from "@/hooks/use-origin";

export const ModalProvider = () => {
  const origin = useOrigin();

  if (!origin) {
    return null;
  }

  return <></>;
};
