"use client";
import Image from "next/image";

export default function HilalCard({
  setModalContent,
  setModalOpen,
  content,
}: {
  setModalContent: any;
  setModalOpen: any;
  content: any;
}) {
  return (
    <div className="card flex w-4/5 flex-col rounded-md shadow-lg md:w-2/5">
      <div className="w-full rounded-t-md">
        <Image
          className="flex w-full rounded-t-md object-cover"
          src={content.images[0].url}
          alt="hilal"
          width={300}
          height={200}
        />
      </div>
      <div className="flex bg-slate-200 p-4">
        <div className="w-3/5">{content.description}</div>
        <div className="w-2/5 text-right">{content.createdAt}</div>
      </div>
      <div className="flex">
        <div
          className={`flex w-1/3 justify-center rounded-bl-md p-4
                    ${
                      content.status != "PENDING"
                        ? "bg-slate-400 hover:cursor-not-allowed"
                        : "bg-blue-300 hover:cursor-pointer hover:bg-blue-500"
                    }
                `}
          onClick={() => {
            {
              content.status == "PENDING" && setModalOpen("RequestModal");
              setModalContent(content);
            }
          }}
        >
          {content.status == "PENDING" ? "Request" : content.status}
        </div>
        <div
          className="flex w-1/3 justify-center bg-yellow-300 p-4 hover:cursor-pointer hover:bg-yellow-500"
          onClick={() => {
            setModalOpen("EditModal");
            setModalContent(content);
          }}
        >
          Edit
        </div>
        <div
          className="flex w-1/3 justify-center rounded-br-md bg-red-300 p-4 hover:cursor-pointer hover:bg-red-500"
          onClick={() => {
            setModalOpen("DeleteModal");
            setModalContent(content);
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
}
