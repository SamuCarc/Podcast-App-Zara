"use client";

export default function Page({ params }: { params: { slug: string } }) {
  return <div>Podcast ID: {params.slug}</div>;
}
