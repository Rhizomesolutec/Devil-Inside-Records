import { Metadata } from "next";
import NotFoundPage from "@/components/error/NotFoundPage";

export const metadata: Metadata = {
  title: "404 Not Found — Devil Inside Records",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
