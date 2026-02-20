import { RocketIcon, SparklesIcon, ZapIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { HeroGradient } from "./BackGround-Gradient";
import Link from "next/link";
import { Button } from "../ui/button";
import { MotionDiv } from "../web/motion-animation";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <HeroGradient />
      <div className="relative section-container section-padding">
        <div className="text-center">
          <Badge className="mb-6 text-sm font-medium" variant={"secondary"}>
            Powered By AI{" "}
            <SparklesIcon className="size-4 inline-block ml-2" />{" "}
          </Badge>
          <h1 className="">
            <span>Find Your Perfect </span>
            <span className="block gradient-text">
              {" "}
              Learning Partner With AI
            </span>
          </h1>
          <p className="hero-subheading">
            Stop learning alone. Get intelligently matched with motivated
            learners who share your ambitions and accelerate your progress
            through collaboration.
          </p>
          <div className="flex flex-col gap-4 md:flex-row justify-center">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.5 }}
            >
              <Link href={"/sign-up"}>
                <Button
                  size={"lg"}
                  className="link-button hero-button-outline group"
                >
                  <span className="hero-button-content">
                    <RocketIcon className="hero-button-icon-primary  group-hover:rotate-12 group-hover:text-black" />
                    Get Started Free
                  </span>
                </Button>
              </Link>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={"/#pricing"}>
                <Button
                  size={"lg"}
                  className="link-button hero-button-primary group"
                >
                  <span className="hero-button-content">
                    <ZapIcon className="hero-button-icon-primary group-hover:scale-125 group-hover:rotate-12" />
                    Buy A Plan
                  </span>
                </Button>
              </Link>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
