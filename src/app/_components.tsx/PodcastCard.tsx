import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CardType {
  imageUrl: string;
  title: string;
  author: string;
  description: string;
  id: string;
}

export const PodcastCard = ({
  imageUrl,
  title,
  author,
  description,
  id,
}: CardType) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="card w-72 p-3 divide-y mr-20 self-start">
      <Link
        href={`/podcast/${id}`}
        className="flex justify-center mx-10 mt-3 mb-6"
      >
        {!isImageLoaded && (
          <div className="skeleton w-48 h-48 rounded-sm absolute"></div>
        )}
        <div className="w-48 h-48">
          <Image
            className="shadow-[0_0px_2px_0px_rgba(0,0,0,0.3)] rounded-sm"
            onLoad={() => setImageLoaded(true)}
            src={imageUrl}
            alt={title}
            width={256}
            height={256}
          />
        </div>
      </Link>
      <Link href={`/podcast/${id}`}>
        <div className="p-4">
          <p className="text-base font-bold">{title}</p>
          <p className="text-[15px] font-normal text-gray-600 italic">
            by {author}
          </p>
        </div>
      </Link>
      <div className="p-4">
        <p className="text-[15px] font-semibold text-gray-800 mb-2">
          Description:
        </p>
        <p
          className="text-[15px] font-normal text-gray-600 italic break-words"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};
