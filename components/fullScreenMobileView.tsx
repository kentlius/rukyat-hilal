import { useEffect, useState } from "react";
import { useCamera } from "@/hooks/use-camera";
import { useWindowSize } from "@/hooks/use-window-size";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FullScreenMobileView = () => {
  let { width, height } = useWindowSize();
  const { captureImage, imageData, switchCameraFacingMode } = useCamera(); // customHook that contains logics
  const [imageDatas, handleImageDatas] = useState<string[]>([]); // capture imageUrls are saved in this state.

  const router = useRouter();

  useEffect(() => {
    //whenever imageData changed, which means captureImage is executed, imageUrl is cumulated in the array.
    handleImageDatas([...imageDatas, imageData]);
  }, [imageData]);

  const handleUpload = () => {
    const descriptionInput = document.getElementById(
      "description"
    ) as HTMLInputElement;
    const description = descriptionInput.value;
    if (imageDatas.length > 3) {
      fetch("api/hilals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: imageDatas[imageDatas.length - 1],
          description: description,
        }),
      }).then(async (res) => {
        if (res.status === 200) {
          toast.success("Pictures uploaded! Redirecting to home...");
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          toast.error(await res.text());
        }
      });
    } else {
      toast.error("TAKE MORE PICT BITCHES!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "flex-start",
        overflow: "hidden",
      }}
    >
      <div className="VideoAndCanvas">
        <video
          width={width}
          height="auto"
          style={{
            maxWidth: "100vw",
            maxHeight: "56.25vw",
            objectFit: "cover",
          }}
        />
        <canvas style={{ opacity: 0 }} />
        <p>
          {width}, {height}
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="#000000"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        id="CaptureImageButton"
        onClick={captureImage}
      >
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute left-10 top-10 -translate-x-1/2 -translate-y-1/2 transform"
        id="SwitchCameraButton"
        onClick={switchCameraFacingMode}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
        />
      </svg>
      {imageDatas.length > 0 && (
        <div
          id="Images"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "1%",
            padding: "1%",
          }}
        >
          {imageDatas.map((imageData, index) => {
            return (
              imageData.length > 10 && (
                <Image
                  key={index}
                  src={imageData}
                  width={width * 0.45}
                  height={width * 0.45}
                  alt="NoImage"
                />
              )
            );
          })}
        </div>
      )}

      <div>
        <label
          htmlFor="description"
          className="block text-xs uppercase text-gray-600"
        >
          Deskripsi
        </label>
        <input
          id="description"
          name="description"
          type="text"
          autoComplete="off"
          required
          defaultValue="KibarAsmaran"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <button
        style={{ backgroundColor: "blue", color: "white", padding: "10px" }}
        onClick={handleUpload}
      >
        Upload Images
      </button>
    </div>
  );
};

export default FullScreenMobileView;
