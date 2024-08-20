import { useEffect, useState } from "react";
import styles from "./WebCam.module.css";

export default function WebCam() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const checkWebcamPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(stream);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkWebcamPermissions();
  }, []);

  return (
    <video
      autoPlay
      muted
      ref={(video) => {
        if (video && stream) {
          video.srcObject = stream;
        }
      }}
      className={styles.webCam}
    />
  );
}
