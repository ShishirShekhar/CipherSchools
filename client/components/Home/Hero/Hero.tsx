import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { Cover } from "@/components/ui/Cover";
import styles from "./Hero.module.css";
import WorldGlobe from "@/components/ui/World";
import { HoverBorderGradient } from "@/components/ui/HoverBorderGradient";

export default function Hero() {
  return (
    <div className={`sectionPadding ${styles.hero}`}>
      <BackgroundBeams />
      <div className={styles.heroText}>
        <h1 className={styles.title}>
          Build amazing quizzes <br /> at <Cover>warp speed</Cover>
        </h1>

        <HoverBorderGradient>
          <span>Create Quiz</span>
        </HoverBorderGradient>
      </div>

      <div className={styles.globe}>
        <WorldGlobe />
      </div>
    </div>
  );
}
