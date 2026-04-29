"use client";

import { useModal } from "./ModalContext";
import BookCallModal from "./BookCallModal";

export default function BookCallModalWrapper() {
  const { isModalOpen, closeModal } = useModal();
  return <BookCallModal isOpen={isModalOpen} onClose={closeModal} />;
}
