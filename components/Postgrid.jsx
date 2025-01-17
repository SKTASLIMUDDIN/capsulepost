import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { decodeHTMLEntities } from '@/utils/lib';
import { formatDate } from '@/utils/lib';

const Postgrid = ({ post }) => {
  console.log(post);

  return (
    <div className="group">
      <div className="relative">
        <div className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
          {post._embedded?.['wp:featuredmedia']?.[0] && (
            <Image
              className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post._embedded['wp:featuredmedia'][0].alt_text || 'Featured Image'}
              width={800}
              height={600}
            />
          )}
        </div>

        {post.category_names && post.category_names.length > 0 && (
          <span className="absolute px-3 py-2 text-xs font-bold tracking-widest text-gray-900 uppercase bg-white rounded left-3 top-3">
            {post.category_names[0]}
          </span>
        )}
      </div>

      <p className="mt-6 text-sm font-medium text-gray-500">{formatDate(post.date)}</p>

      <p className="mt-4 text-xl font-bold leading-tight text-gray-900 xl:pr-8">
        <Link href={`/${post.slug}`} title="">
          {decodeHTMLEntities(post.title.rendered)}
        </Link>
      </p>

      <div className="mt-6">
        <Link
          href={`/${post.slug}`}
          title=""
          className="inline-flex items-center pb-2 text-xs font-bold tracking-widest text-gray-900 uppercase border-b border-gray-900 group"
        >
          Continue Reading
          <svg
            className="w-4 h-4 ml-2 transition-all duration-200 transform group-hover:translate-x-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Postgrid;



{/*import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { decodeHTMLEntities } from '@/utils/lib';
import { formatDate } from '@/utils/lib';
const Postgrid = ({ post }) => {
  console.log(post);

  return (
    <div className="group">
      <div className="relative">
        <div className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
         {post._embedded?.['wp:featuredmedia']?.[0] && (
         <Image
          className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
          src={post._embedded['wp:featuredmedia'][0].source_url}
          alt={post._embedded['wp:featuredmedia'][0].alt_text || 'Featured Image'}
          width={800}
          height={600}
        />
        )}
         </div>
       </div>
    </div>

        {post.category_names && post.category_names.length > 0 && (
          <span className="absolute px-3 py-2 text-xs font-bold tracking-widest text-gray-900 uppercase bg-white rounded left-3 top-3">
            {post.category_names[0]}
          </span>
        )}
      </div>
      <p className="mt-6 text-sm font-medium text-gray-500">
        {formatDate(post.date)}
      </p>
      <p className="mt-4 text-xl font-bold leading-tight text-gray-900 xl:pr-8">
        <Link href={`/${post.slug}`} title="" className="">
          {decodeHTMLEntities(post.title.rendered)}
        </Link>
      </p>
      <div className="mt-6">
        <Link
          href={`/${post.slug}`}
          title=""
          className="inline-flex items-center pb-2 text-xs font-bold tracking-widest text-gray-900 uppercase border-b border-gray-900 group"
        >
          Continue Reading
          <svg
            className="w-4 h-4 ml-2 transition-all duration-200 transform group-hover:translate-x-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Postgrid;
*/}