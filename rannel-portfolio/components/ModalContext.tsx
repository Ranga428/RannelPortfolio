"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const ModalContext = createContext<{
  isModalOpen: boolean;
  scrollbarWidth: number;
  openModal: () => void;
  closeModal: () => void;
} | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        scrollbarWidth,
        openModal: () => {
          const width = window.innerWidth - document.documentElement.clientWidth;
          setScrollbarWidth(width);
          setIsModalOpen(true);
        },
        closeModal: () => {
          setScrollbarWidth(0);
          setIsModalOpen(false);
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
