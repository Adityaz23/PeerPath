export default function BackgroundGradient() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* // Base ground gardient :- */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-muted/50" />
      {/* Radial gradient for the depth layers :- */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 height:600px width:600px rounded-full bg-primary/10 blur-3xl" />

      {/* Additional gradient accent :- */}
      <div
        className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/15 blur-2xl animate-pulse"
        style={{ animationDuration: "3s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/15 blur-2xl animate-pulse"
        style={{ animationDuration: "6s" }}
      />

      {/* Grid pattern :- */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 50 0 L 0 0 0 50' fill='none' stroke='currentColor' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Subtle noise texture :- */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export function HeroGradient() {
  return (
    <>
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 height:500px width: 800px rounded-full bg-primary/10 blur-3xl" />
    </>
  );
}
