import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "xs1durmm",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});