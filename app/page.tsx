import BackgroundGradient from "@/components/landing/BackGround-Gradient";
import CtaSection from "@/components/landing/cta-section";
import FeatureSection from "@/components/landing/feature-section";
import HeroSection from "@/components/landing/hero-section";
import HowItWorksSection from "@/components/landing/how-it-works";
import PricingSection from "@/components/landing/pricing-section";
import { MotionSection } from "@/components/web/motion-animation";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <BackgroundGradient />
      <div className="relative z-10 space-y-24">
        <HeroSection />

        <MotionSection>
          <FeatureSection />
        </MotionSection>

        <MotionSection>
          <HowItWorksSection />
        </MotionSection>

        <MotionSection>
          <PricingSection />
        </MotionSection>

        <MotionSection>
          <CtaSection />
        </MotionSection>
      </div>
    </div>
  );
}