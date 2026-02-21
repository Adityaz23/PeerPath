"use client"
import { RocketIcon, SparklesIcon, ZapIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { HeroGradient } from "./BackGround-Gradient";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  MotionContainer,
  MotionItem,
} from "../web/motion-animation";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <HeroGradient />

      <div className="relative section-container section-padding">
        <MotionContainer className="text-center">
          <MotionItem>
            <Badge className="mb-6 text-sm font-medium" variant="secondary">
              Powered By AI
              <SparklesIcon className="size-4 inline-block ml-2" />
            </Badge>
          </MotionItem>

          <MotionItem>
            <h1>
              <span>Find Your Perfect </span>
              <span className="block gradient-text">
                Learning Partner With AI
              </span>
            </h1>
          </MotionItem>

          <MotionItem>
            <p className="hero-subheading">
              Stop learning alone. Get intelligently matched with motivated
              learners who share your ambitions and accelerate your progress
              through collaboration.
            </p>
          </MotionItem>

          <MotionItem>
            <div className="flex flex-col gap-4 md:flex-row justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="link-button hero-button-outline group"
                  >
                    <span className="hero-button-content">
                      <RocketIcon className="hero-button-icon-primary group-hover:rotate-12 transition-transform" />
                      Get Started Free
                    </span>
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href="/#pricing">
                  <Button
                    size="lg"
                    className="link-button hero-button-primary group"
                  >
                    <span className="hero-button-content">
                      <ZapIcon className="hero-button-icon-primary group-hover:scale-125 group-hover:rotate-12 transition-transform" />
                      Buy A Plan
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </MotionItem>
        </MotionContainer>
      </div>
    </section>
  );
}