import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function StatsCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-xl">{value}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
