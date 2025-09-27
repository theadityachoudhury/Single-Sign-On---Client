import { generateRobotsTxt } from "~/lib/robots";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const robotsTxt = generateRobotsTxt(undefined, request);
  
  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400", // Cache for 1 day
    },
  });
}