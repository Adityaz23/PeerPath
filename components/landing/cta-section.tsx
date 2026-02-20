import Link from "next/link";
import { Button } from "../ui/button";

export default function CtaSection() {
  return (
    <section className="section-container">
      <div className="border rounded-lg p-8 sm:p-12 text-center">
        <div className="max-w-2xl mx-auto">
            <h2>Stop Learning Alone</h2>
            <p className="text-lg mb-8">Get matched with someone learning the same things. Stay accountable. Build real projects together.</p>
        </div>
        <Link href={"/sign-up"}>
          <Button size={"lg"}>Try it free</Button>
        </Link>
      </div>
    </section>
  );
}
