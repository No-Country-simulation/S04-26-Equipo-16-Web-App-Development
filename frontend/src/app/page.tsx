import ThemeBtn from "@/components/ThemeBtn";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>SHADCN</CardTitle>
          <CardAction>
            <ThemeBtn />
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
