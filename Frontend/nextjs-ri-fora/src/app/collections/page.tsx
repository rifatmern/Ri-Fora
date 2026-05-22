import CollectionsClient from "./CollectionsClient";
import { client } from "@/sanity/client";

export default async function Page() {
  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    slug,
    category,
    image,
    images
  }`);

  return <CollectionsClient posts={posts || []} />;
}