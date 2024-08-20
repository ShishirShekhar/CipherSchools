import LoginForm from "@/components/Login/LoginForm/LoginForm";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={`section ${styles.login}`}>
      <LoginForm />
    </div>
  );
}
