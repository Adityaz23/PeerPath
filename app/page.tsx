import BackgroundGradient from "@/components/landing/BackGround-Gradient";
import CtaSection from "@/components/landing/cta-section";
import FeatureSection from "@/components/landing/feature-section";
import HeroSection from "@/components/landing/hero-section";
import HowItWorksSection from "@/components/landing/how-it-works";
import PricingSection from "@/components/landing/pricing-section";
import { MotionDiv } from "@/components/web/motion-animation";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <BackgroundGradient />
      <div className="relative z-10">
        {/* now, adding the motion animation which we have defined :- */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <HeroSection />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 ,delay:0.1 }}
        >
          <FeatureSection />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 , delay:0.2}}
        >
          <HowItWorksSection />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay:0.3 }}
        >
          <PricingSection />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 ,delay:0.3}}
        >
          <CtaSection />
        </MotionDiv>
      </div>
    </div>
  );
}
