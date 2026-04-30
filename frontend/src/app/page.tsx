/**
 * Root page.
 * Redirects to the invitation flow entry point.
 * In production, this would be replaced by a proper landing page
 * or the redirect would be handled at the middleware level.
 */

import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/invitation?name=Juan%20Carlos%20Torres&token=demo");
}