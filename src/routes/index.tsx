import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/meridian/dashboard";

export const Route = createFileRoute("/")({ component: Dashboard });
