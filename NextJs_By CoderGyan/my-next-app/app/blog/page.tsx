import Link from "next/link";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "First Post",
      content: "This is the content of the first post.",
    },
    {
      id: 2,
      title: "Second Post",
      content: "This is the content of the second post.",
    },
  ];

  return (
    <div>
      <h1>Blog Posts</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
