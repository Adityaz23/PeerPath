import { Button } from "../ui/button";

export default function AIMatching({ totalGoals }: { totalGoals: number }) {
  return (
    <div className="text-center py-8">
      <div className="mb-4">
        <h3>AI-Powered Matching</h3>
        <p>
          Our AI will analyze your learning goals and automatically match you
          with the most compatible learning partners in this community.
        </p>
      </div>
      <Button size={"lg"} className="font-bold">
        🤖 Find Partners With AI
      </Button>

      {totalGoals > 0 && (
        <p className="mt-3 text-muted-foreground/70">
          You have {totalGoals} learning goals.
        </p>
      )}
      {totalGoals === 0 && (<p className="mt-3 text-muted-foreground">Add learning goals to enable the AI matching.</p>)}
    </div>
  );
}
