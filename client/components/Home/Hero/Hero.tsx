import Link from "next/link";
import { Cover } from "@/components/ui/Cover";
import WorldGlobe from "@/components/ui/World";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { HoverBorderGradient } from "@/components/ui/HoverBorderGradient";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={`sectionPadding ${styles.hero}`}>
      <BackgroundBeams />
      <div className={styles.heroText}>
        <h1 className={styles.title}>
          Build amazing quizzes <br /> at <Cover>warp speed</Cover>
        </h1>

        <HoverBorderGradient>
          <Link href="/dashboard">
            <span>Start Now</span>
          </Link>
        </HoverBorderGradient>
      </div>

      <div className={styles.globe}>
        <WorldGlobe />
      </div>
    </div>
  );
}
