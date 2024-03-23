"use client";

import { Message } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

export const MessageManagerContext = createContext<{
  messages: Message[];
  addMessage: (message: Message) => void;
}>({ messages: [], addMessage: (v) => {} });

export const MessageManagerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "content1",
      userId: "1",
      roomId: "1",
      deleted: false,
      createdAt: new Date("2024-01-27T13:36:09.266Z"),
      updatedAt: new Date("2024-01-27T13:36:09.266Z"),
    },
    {
      id: "2",
      content: "content2",
      userId: "2",
      roomId: "1",
      deleted: false,
      createdAt: new Date("2024-01-27T13:36:09.266Z"),
      updatedAt: new Date("2024-01-27T13:36:09.266Z"),
    },
    {
      id: "3",
      content: "content3",
      userId: "3",
      roomId: "1",
      deleted: false,
      createdAt: new Date("2024-01-27T13:36:09.266Z"),
      updatedAt: new Date("2024-01-27T13:36:09.266Z"),
    },
  ]);

  return (
    <MessageManagerContext.Provider
      value={{
        messages,

        // this can be used when a messageMessage logs in
        addMessage: (message) => {
          setMessages((prev) => [...prev, message]);
        },
      }}
    >
      {children}
    </MessageManagerContext.Provider>
  );
};

export const useMessageManager = () => {
  return useContext(MessageManagerContext);
};
