"use client";
import Image from "next/image";

export default function HilalCard (
{setModalContent, setModalOpen, content}:
{
    setModalContent: any,
    setModalOpen: any,
    content: any,
}
) {
    // date transformator
    const tranformDate = (dateString: string) => {
        const date = new Date(dateString);
        // option for date string
        const dateOpt = {
            day: '2-digit' as const, 
            month: 'long' as const, 
            year: 'numeric' as const,
        };
        const formattedDate = date.toLocaleDateString('en-GB', dateOpt);

        return(formattedDate);
    }

    return (
        <div className="card flex flex-col w-4/5 md:w-2/5 rounded-md shadow-lg">
            <div className="w-full rounded-t-md">
                <Image
                    className="flex w-full object-cover rounded-t-md"
                    src={content.images[0].url}
                    alt="hilal"
                    width={300}
                    height={200}
                />
            </div>
            <div className="flex p-4 bg-slate-200">
                <div className="w-3/5">
                    {content.description}
                </div>
                <div className="text-right w-2/5">
                    { tranformDate(content.createdAt as string) }
                </div>
            </div>
            <div className="flex">
                <div
                className={`flex justify-center w-1/3 p-4 rounded-bl-md
                    ${content.status!="PENDING" ? "hover:cursor-not-allowed bg-slate-400" : "hover:cursor-pointer bg-blue-300 hover:bg-blue-500"}
                `}
                onClick={() => {
                    {content.status=="PENDING" &&
                        setModalOpen("RequestModal");
                        setModalContent(content);
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
