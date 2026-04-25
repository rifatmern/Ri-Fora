import { client } from "@/sanity/client";
import ProductClient from "@/app/[slug]/ProductClient";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug },
  );

  return <ProductClient post={post} />;
}
