import Webcam from "react-webcam";
import { Button } from "@/components";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCurrentUser } from "@/context";

export default function Home() {
  const videoRef = useRef<any>(null);
  const [screenshot, setScreenshot] = useState('');
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const stopCam = () => {
    let stream = videoRef.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track: any) => track.stop());
    setIsRecording(false);
  }

  const capture = useCallback(() => {
    const imageSrc: any = videoRef.current.getScreenshot();
    setScreenshot(imageSrc);
  }, [videoRef]);

  const send = useCallback(() => {}, [])

  return (
    <section className="w-full h-screen p-3">
      <div className="w-full h-full flex relative items-center justify-center">
          <div className="w-80 h-auto flex flex-col items-center gap-4">
              <div className="w-full bg-cover bg-no-repeat h-96 border flex justify-center items-center overflow-hidden">
                  {/* { windowImage && <img src={windowImage} alt="image" className="w-full h-full" /> } */}
                  {/* <video src="" ref={videoRef} /> */}
                  { isRecording ? <Webcam imageSmoothing={true} ref={videoRef} screenshotFormat='image/webp' videoConstraints={videoContainer} /> : null }
              </div>
              <div className="flex gap-4 flex-wrap justify-center">
                  <Button label={!isRecording ? "attendance" : 'open cam'} onClick={stopCam} secondary={true} />
                  <Button label="screenshot" onClick={capture} secondary={true} />
                  <Button label="send" onClick={send} secondary={true} />
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