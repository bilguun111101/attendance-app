import axios from "axios";
import Webcam from "react-webcam";
import { Button } from "@/components";
import { useCurrentUser } from "@/context";
import { toast } from "react-hot-toast";
import { useCallback, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<any>(null);
  // const [screenshot, setScreenshot] = useState('');
  const { userID } = useCurrentUser();
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // const stopCam = () => {
  //   let stream = videoRef.current.stream;
  //   const tracks = stream.getTracks();
  //   tracks.forEach((track: any) => track.stop());
  //   setIsRecording(false);
  // }

  const stopCam = useCallback(() => {
    setIsRecording(false);
  }, [isRecording])

  const capture = useCallback(async() => {
    if(!isRecording) return;
    const imageSrc: File = videoRef.current.getScreenshot();
    const newFile = new File([imageSrc], `${userID}.${imageSrc.name.split('.').at(-1)}`, { type: imageSrc.type });
    try {
      const { data } = await axios.post('https://ksjy63w4f3.execute-api.us-east-1.amazonaws.com/dev/url', {
        Key: newFile.name,
        ContentType: newFile.type
      });
    } catch (error) {
      toast.error("Screenshot wasn't send!!!")
    }
  }, [videoRef]);

  const openCam = useCallback(() => {
    setIsRecording(true);
  }, [isRecording])

  return (
    <section className="w-full h-screen p-3">
      <div className="w-full h-full flex relative items-center justify-center">
          <div className="w-80 h-auto flex flex-col items-center gap-4">
              <div className="w-full bg-cover bg-no-repeat h-96 border flex justify-center items-center overflow-hidden">
                {
                  isRecording ?
                    <Webcam imageSmoothing={true} ref={videoRef} screenshotFormat='image/webp' videoConstraints={videoContainer} audio={false} />
                      :
                    null
                }
              </div>
              <div className="flex gap-4 flex-wrap justify-center">
                  <Button label={isRecording ? "stop cam" : 'open cam'} onClick={isRecording ? stopCam : openCam} secondary={true} />
                  <Button label="screenshot" onClick={capture} secondary={true} />
              </div>
          </div>
      </div>
    </section>
  )
}

const videoContainer = {
  width: { min: 100 },
  height: { min: 100 },
  aspectRatio: 0.6666666667,
  facingMode: "user"
}