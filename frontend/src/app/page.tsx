

import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/invitation?name=Juan%20Carlos%20Torres&token=demo");
}