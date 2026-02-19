import { PricingTable } from "@clerk/nextjs";

export default function Home(){
  return(
    <div>
      <h1 className="text-3xl">Home Page!</h1>
      <PricingTable />
    </div>
  )
}