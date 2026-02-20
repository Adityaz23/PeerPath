import { PricingTable } from "@clerk/nextjs";
import SectionHeading from "./Section-Heading";

export default function PricingSection() {
  return (
    <section className="section-padding section-container" id="pricing">
      <SectionHeading
        title="Simple Transparent Pricing"
        description="Choose the best plan that works with you. Start free and upgrade as you grow."
      />
      <div className="max-w-2xl mx-auto">
        <PricingTable />
      </div>
      <p className="text-center text-muted-foreground mt-5">All paid plans include a 14-day free trial. No <span className="font-bold">credit cards</span> required</p>
    </section>
  );
}
