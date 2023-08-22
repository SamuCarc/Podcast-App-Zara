import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SmallCardType {
  imageUrl: string;
  title: string;
  author: string;
  id: string;
}

export const PodcastSmallCard = ({
  imageUrl,
  title,
  author,
  id,
}: SmallCardType) => {
  return (
    <Link href={`podcast/${id}`} className="col-span-12 sm:col-span-3">
      <div className="rounded shadow-[0_2px_6px_0px_rgba(0,0,0,0.3)] relative mt-16 mb-6 p-4 m-0.5">
        <div className="shadow-[0_0px_2px_0px_rgba(0,0,0,0.3)] absolute -top-9 left-1/2 transform -translate-x-1/2 rounded-full overflow-hidden">
          <Image
            className="rounded-full"
            src={imageUrl}
            alt={title}
            width={90}
            height={90}
          />
        </div>
        <div className="mt-10 flex flex-col items-center text-center">
          <h2 className="text-sm font-medium mb-2">{title}</h2>
          <p className="text-xs font-medium text-gray-600">Author: {author}</p>
        </div>
      </div>
    </Link>
  );
};
