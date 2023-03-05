import {useEffect, useState} from 'react';
import {useCamera} from '@/components/useCamera';
import { useWindowSize } from '@tofusoup429/use-window-size';
import LensIcon from '@mui/icons-material/Lens';
import LoopIcon from '@mui/icons-material/Loop';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FullScreenMobileView = () => {
    let {width, height} = useWindowSize() // get window width and height as everytime screen resized. 
    const {captureImage ,imageData, switchCameraFacingMode} = useCamera(); // customHook that contains logics
    const [imageDatas, handleImageDatas] = useState<string[]>([]) // capture imageUrls are saved in this state. 

    const router = useRouter();
    
    useEffect(()=>{
        //whenever imageData changed, which means captureImage is executed, imageUrl is cumulated in the array. 
        handleImageDatas([...imageDatas, imageData]) 
        console.log(imageDatas);
        console.log(imageData)
        console.log(imageDatas[imageDatas.length - 1]);
        console.log(imageDatas.length);
    }, [imageData])
    
    const handleUpload = () => {
        const descriptionInput = document.getElementById('description') as HTMLInputElement;
        const description = descriptionInput.value;
        if (imageDatas.length > 3) {
            fetch("api/hilals", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url: imageDatas[imageDatas.length-1],
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
            toast.error("TAKE MORE PICT BITCHES!")
        }

    }

    return(
        <div style={{display:"flex", flexDirection:"column", justifyContent:"start", alignItems:"flex-start", overflow:"hidden"}}>
            <div className="VideoAndCanvas" >
                <video width={width} height="auto" style={{maxWidth:"100vw", maxHeight:"56.25vw", objectFit:"cover"}}/>
                <canvas style={{opacity:0}} />
                <p>{width}, {height}</p>
            </div>
            <LensIcon id='CaptureImageButton' fontSize='large' color="secondary" style={{width:'75px', height:"75px", position:'absolute', top:height*0.9, left:width*0.5, transform: "translate(-50%, -50%)"}} onClick={captureImage} />
            <LoopIcon id='SwitchCameraButton' fontSize='large' color="secondary" style={{position:'absolute', top:'40px', left:'40px', transform: "translate(-50%, -50%)" }} onClick={switchCameraFacingMode} />
            {imageDatas.length>0 && 
            <div id="Images" style={{display:"flex", flexDirection:"row", justifyContent:"center", flexWrap:'wrap', margin:'1%', padding:'1%' }}>
                {
                    imageDatas.map((imageData, index)=>{
                        return(
                            imageData.length>10 && <img key={index} src={imageData} width={width*0.45} alt='NoImage'/>
                        )
                    })
                }
            </div>
            }

            <div>
                <label
                    htmlFor="description"
                    className="block text-xs text-gray-600 uppercase"
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
            <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }} onClick={handleUpload}>Upload Images</button>

        </div>
    ) 
}

export default FullScreenMobileView;