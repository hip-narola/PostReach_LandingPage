import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: "23xi7ruv",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// URL builder setup
const builder = imageUrlBuilder(client);

// Function to generate image URLs with TypeScript
export const urlFor = (source: { asset: { _ref: string; _type: string }; _type: string }) => builder.image(source);