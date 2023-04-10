"use client";

import { useState } from "react";
import HilalCard from "./HilalCard";
import RequestModal from "./RequestModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

export default function HilalCards({ hilals }: { hilals: any }) {
  const [modalOpen, setModalOpen] = useState();
  const [modalContent, setModalContent] = useState({});

  return (
    <>
      {hilals.map((hilal: any) => (
        <HilalCard
          key={hilal.id}
          setModalContent={setModalContent}
          setModalOpen={setModalOpen}
          content={hilal}
        />
      ))}
      {modalOpen == "RequestModal" && (
        <RequestModal
          setModalContent={setModalContent}
          setModalOpen={setModalOpen}
          content={modalContent}
        />
      )}
      {modalOpen == "EditModal" && (
        <EditModal
          setModalContent={setModalContent}
          setModalOpen={setModalOpen}
          content={modalContent}
        />
      )}
      {modalOpen == "DeleteModal" && (
        <DeleteModal
          setModalContent={setModalContent}
          setModalOpen={setModalOpen}
          content={modalContent}
        />
      )}
    </>
  );
}
