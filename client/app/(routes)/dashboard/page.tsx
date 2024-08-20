"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { checkAuth, logOut } from "@/lib/utils";
import { User } from "@/lib/types";
import avatar from "@/assets/images/avatar.jpg";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogOut = async () => {
    const message = await logOut();
    if (message === "User logged out") {
      router.push("/login");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await checkAuth();
      if (!user) {
        router.push("login");
      } else {
        setUser(user);
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`section ${styles.dashboard}`}>
      <h1 className={styles.title}>Dashboard</h1>
      <h2 className={styles.welcome}>Welcome, {user?.name}</h2>

      <div className={styles.container}>
        <div className={styles.left}>
          <Image
            src={avatar}
            alt={user?.name}
            width={100}
            height={100}
            className={styles.avatar}
          />

          <div className={styles.line}></div>
        </div>

        <div className={styles.right}>
          <div className={styles.infoContainer}>
            <p className={styles.info}>
              <span className={styles.label}>Id:</span> {user._id}
            </p>
            <p className={styles.info}>
              <span className={styles.label}>Name:</span> {user.name}
            </p>
            <p className={styles.info}>
              <span className={styles.label}>Email:</span> {user.email}
            </p>
          </div>

          <div className={styles.btnContainer}>
            <Link href="/tests">
              <button className={styles.btn}>Take Tests</button>
            </Link>
            <button className={styles.btn} onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
