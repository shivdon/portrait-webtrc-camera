import Image from "next/image";
import { useRef, useEffect } from "react";
import { gettingMedia } from "../helpers";
import styles from "../styles/Home.module.css";

export default function Home() {
  const videoRef = useRef();
  const canvasRef = useRef();

  const handleClick = () => {
    videoRef.current.pause();
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    canvasRef.current
      .getContext("2d")
      .drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

    const drawer = canvasRef.current.toDataURL("image/jpeg");

    var link = document.createElement("a");
    link.download = "filename.jpg";
    link.href = drawer;
    link.click();

    console.log(drawer);
  };

  useEffect(async () => {
    videoRef.current.srcObject = await gettingMedia();
    console.log(videoRef);
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <video
          ref={videoRef}
          className={styles.videoPlayer}
          playsInline
          autoPlay
        ></video>
        <canvas
          ref={canvasRef}
          style={{
            display: "none",
            width: "100%",
            height: "100%",
          }}
        />
        <div className={styles.image}>
          <img src="/front.svg" />
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={() => videoRef.current.play()}>Reset</button>

          <button onClick={handleClick}>Capture</button>
        </div>
      </div>
    </div>
  );
}
