"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";
import React from "react";

interface ImageModalProps {
  isOpen?: boolean;
  src?: string | null;
  onClose: () => void;
}
const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) return null;

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="h-80 w-80">
        <Image
          alt="image"
          className="object-fit"
          fill
          sizes="(max-width: 100vw)"
          src={src}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
