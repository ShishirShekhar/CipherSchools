import { useEffect, useState } from "react";
import styles from "./WebCam.module.css";

export default function WebCam({ on }: { on: boolean }) {
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

  useEffect(() => {
    if (stream) {
      if (on) {
        stream.getTracks().forEach((track) => {
          track.enabled = true;
        });
      } else {
        stream.getTracks().forEach((track) => (track.enabled = false));
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [on, stream]);

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
