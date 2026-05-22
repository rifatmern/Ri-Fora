import { client } from "@/sanity/client";
import ProductClient from "@/app/[slug]/ProductClient";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!post) {
    return (
      <div className="p-10 text-center text-gray-500">
        Product not found 😢
      </div>
    );
  }

  return <ProductClient post={post} />;
}