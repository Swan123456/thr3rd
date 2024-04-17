import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import React from "react";

export default async function Home() {
  const session = await getAuthSession();

  const posts = await prisma.post.findMany({
    where: {
      parentId: null,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          image: true,
          username: true,
          id: true,
        },
      },
      likes: {
        select: {
            userId: true
        },
        where: {
            userId: session?.user.id ?? "error"
        }
      },
      _count: {
        select: {
            likes: true,
            replies: true,
        },
      },
    },
  });

  return <div>
    {posts.map(p => (
        <p key={p.id}>
            {p.content}
        </p>
    ))}
  </div>;
}
