import { createClient } from "@sanity/client";

export default createClient({
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    dataset: process.env.EXPO_PUBLIC_DATASET,
    apiVersion: "2023-05-03",
    useCdn: true,
});
