"use client";
import { useRouter } from "next/navigation";
import styles from "./Finish.module.css";

export default function FinishPage() {
  const router = useRouter();

  const handleHomeRedirect = () => {
    router.push("/"); // Redirect to the home page or any other page
  };

  return (
    <div className={`section ${styles.finish}`}>
      <h1 className={styles.title}>Thank You!</h1>
      <p>Your test has been successfully submitted.</p>
      <p>You will soon receive you result on mail</p>
      <button className={styles.btn} onClick={handleHomeRedirect}>
        Go to Home
      </button>
    </div>
  );
}
