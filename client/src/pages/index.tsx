import axios from "axios";
import Webcam from "react-webcam";
import { Button } from "@/components";
import { toast } from "react-hot-toast";
import { useCurrentUser } from "@/context";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<any>(null);
  const { userID, email } = useCurrentUser();
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const stopCam = useCallback(() => {
    setIsRecording(false);
  }, [isRecording])

  const capture = useCallback(async() => {
    if(!isRecording) return;
    const imageSrc: any = videoRef.current.getScreenshot();
    try {
      const result = await (await fetch(imageSrc)).blob();
      const newFile = new File([result], `${userID}.${result.type.split('/').at(-1)}`, { type: result.type });
      const date = new Date();
      const response = await axios.post('https://ksjy63w4f3.execute-api.us-east-1.amazonaws.com/dev/url', {
        Key: newFile?.name,
        ContentType: newFile?.type,
        Bucket: "leaf3bbbilguun0426attendance"
      });
      await fetch(response.data.url, {
        method: 'PUT',
        body: newFile
      })

      // --
      const day = date.getDate()
      const hour = date.getHours();
      const month = date.getMonth() + 1;
      const minutes = date.getMinutes();
      const attendance = await axios.post("https://ksjy63w4f3.execute-api.us-east-1.amazonaws.com/dev/attendance", {
        day,
        hour,
        month,
        email,
        userID,
        minutes,
      });
      // ==

      setIsRecording(false);
      toast.success(attendance.data.attendance);
    } catch (error) {
      console.log(error)
      toast.error("Screenshot wasn't send!!!")
    }
  }, [videoRef]);

  const openCam = useCallback(() => {
    setIsRecording(true);
  }, [isRecording])

  // const handleImage = async(target: any) => {
  //   if(!target.files) return;
  //   const file = target.files[0];
  //   if(!file) return;
  //   const newFile = new File([file], `${userID}.${file.name.split('.').at(-1)}`, { type: file.type });
  //   const { data } = await axios.post('https://ksjy63w4f3.execute-api.us-east-1.amazonaws.com/dev/url', {
  //     Key: newFile.name,
  //     ContentType: newFile.type,
  //     Bucket: "leaf3bbbilguun0426"
  //   });
  //   await fetch(data, {
  //     method: 'PUT',
  //     body: JSON.stringify(newFile)
  //   })
  //   // const response = await axios.post('https://ksjy63w4f3.execute-api.us-east-1.amazonaws.com/dev/face', {
  //   //   Name: newFile.name
  //   // })
  //   const response = await fetch("https://ksjy63w4f3.execute-api.us-east-1.amazonaws.com/dev/face", {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       Name: newFile.name
  //     })
  //   })
  //   const result = await response.json();
  //   console.log(result);
  // };
  // useEffect(() => {
  //   console.log(userID)
  // }, [userID])

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
                  {/* <input type="file" onChange={({ target }) => handleImage(target)} /> */}
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