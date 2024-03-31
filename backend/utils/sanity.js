import { createClient } from "@sanity/client";
import dotenv from 'dotenv';
dotenv.config();

export default createClient({
    projectId: process.env.PROJECT_ID,
    dataset: process.env.DATASET,
    apiVersion: "2023-05-03",
    useCdn: true,
});
