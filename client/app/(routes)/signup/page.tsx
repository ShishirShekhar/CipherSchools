import styles from "./SignUp.module.css";
import SignupForm from "@/components/SignUp/SignupForm/SignupForm";

export default function SignUp() {
  return (
    <div className={`section ${styles.signUp}`}>
      <SignupForm />
    </div>
  );
}