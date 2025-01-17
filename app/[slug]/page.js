'use client';
import React, { useEffect, useState } from 'react';
import { getPost } from '@/actions/wp.actions';
import DOMPurify from 'dompurify';
import { NextSeo } from 'next-seo';
import { decodeHTMLEntities, formatDate } from '@/utils/lib';
import Image from 'next/image';
import Comments from '@/components/Comments';

const Page = ({ params }) => {
  const { slug } = params;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await getPost(slug);
      setPost(response[0]);
      setError(null);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  if (error) {
    return <div>Error loading post: {error.message || 'Not Found'}</div>;
  }

  if (loading || !post) {
    return <div>Loading...</div>;
  }

  const postTitle = decodeHTMLEntities(post?.title?.rendered || '');
  const postDescription = decodeHTMLEntities(post?.excerpt?.rendered || '').replace(/<[^>]+>/g, '');
  const postImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  const postCategory = decodeHTMLEntities(post?.category_names || '');
  const postDate = formatDate(post?.date || '');

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postTitle,
    description: postDescription,
    image: postImage,
    author: {
      "@type": "Person",
      name: post._embedded?.author?.[0]?.name || 'Unknown',
    },
    publisher: {
      "@type": "Organization",
      name: "Capsule Post",
      logo: {
        "@type": "ImageObject",
        url: "/path-to-logo.png", // Replace with your site's logo URL
      },
    },
    datePublished: post.date,
    dateModified: post.modified,
  };

  return (
    <>
      <NextSeo
        title={postTitle}
        description={postDescription}
        openGraph={{
          url: `https://capsulepost.in/${slug}`,
          title: postTitle,
          description: postDescription,
          images: [{ url: postImage, alt: postTitle }],
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-xl mx-auto text-center">
            <nav className="flex items-center justify-center">
              <ol className="flex items-center space-x-2">
                <li>
                  <a href="/" title="Home" className="text-base font-medium text-gray-900">
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="text-gray-500 mx-2">/</span>
                    <span className="text-base font-medium text-gray-500">{postTitle}</span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">{postTitle}</h1>
            <div className="flex items-center justify-center mt-8 space-x-2">
              <p className="text-base font-medium text-gray-900">{postCategory}</p>
              <span className="text-base font-medium text-gray-500">•</span>
              <p className="text-base font-medium text-gray-500">{postDate}</p>
            </div>
          </div>

          {postImage && (
            <div className="mt-6 sm:mt-10 lg:mt-14">
              <Image
                className="object-cover w-full h-full rounded-lg"
                src={postImage}
                alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || 'Featured Image'}
                width={800}
                height={600}
              />
            </div>
          )}

          <div className="grid grid-cols-1 mt-8 sm:mt-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-12 gap-y-8">
            <div className="lg:col-span-2 lg:self-start lg:sticky lg:top-6 lg:order-last">
              {/* Social Media Links */}
              <ul className="flex space-x-3 lg:space-y-4 lg:flex-col lg:items-center">
      
                <li>
                <a
                  href="#"
                  ti0tle=""
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <span className="sr-only">Discord</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"></path>
                  </svg>
                </a>
                </li>
                <li>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <span className="sr-only">Telegram</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
                  </svg>
                </a>
               </li>
                {/* Add more social links */}
              </ul>
            </div>

            <article
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post?.content?.rendered),
              }}
              className="prose lg:col-span-8 max-w-none prose-gray prose-blockquote:px-8 prose-blockquote:py-3 prose-blockquote:lg:text-xl prose-blockquote:font-medium prose-blockquote:text-gray-900 prose-blockquote:border-gray-900 prose-blockquote:border-l-2 prose-blockquote:lg:leading-9 prose-blockquote:not-italic prose-blockquote:bg-gray-100 prose-blockquote:text-lg prose-blockquote:leading-8"

              //className="prose lg:col-span-8 max-w-none prose-gray"
            ></article>
          </div>
        </div>
        <Comments post={post} />
      </section>
    </>
  );
};

export default Page;


{/*'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { getPost } from '@/actions/wp.actions';
import DOMPurify from 'dompurify';
import { NextSeo } from "next-seo";
// import { decodeHTMLEntities } from '@/utils/lib';
// import { formatDate } from '@/utils/lib';
import { decodeHTMLEntities, formatDate } from '@/utils/lib';
import Image from 'next/image';
import Comments from '@/components/Comments';
const Page = ({ params }) => {
  const { slug } = params;

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example usage

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await getPost(slug);
      setPost(response[0]);
      setError(response?.data.status);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPost();
  }, []);

  if (error?.status == 404) {
    return <div>Not Found</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
   <NextSeo
     <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-xl mx-auto text-center">
          <nav className="flex items-center justify-center">
            <ol className="flex items-center space-x-2">
              <li>
                <a
                  href="/"
                  title=""
                  className="text-base font-medium text-gray-900"
                >
                  Home
                </a>
              </li>

              <li>
                <div className="flex items-center">
                  /{' '}
                  <a
                    href="#"
                    title=""
                    className="ml-2 text-base font-medium text-gray-500"
                  >
                    {decodeHTMLEntities(post?.title?.rendered)}
                  </a>
                </div>
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">
            {decodeHTMLEntities(post?.title?.rendered)}
          </h1>

          <div className="flex items-center justify-center mt-8 space-x-2">
            <p className="text-base font-medium text-gray-900">
              {decodeHTMLEntities(post?.category_names)}
            </p>
            <span className="text-base font-medium text-gray-500">•</span>
            <p className="text-base font-medium text-gray-500">
              {formatDate(post?.date)}
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-10 lg:mt-14 aspect-w-16 aspect-h-8 lg:aspect-h-6">
        
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
    />

        <div className="grid grid-cols-1 mt-8 sm:mt-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-12 gap-y-8">
          <div className="lg:col-span-2 lg:self-start lg:sticky lg:top-6 lg:order-last">
            <ul className="flex space-x-3 lg:space-x-0 lg:space-y-4 lg:flex-col lg:items-center">
              <li>
                <a
                  href="#"
                  ti0tle=""
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <span className="sr-only">Discord</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <span className="sr-only">Telegram</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block lg:col-span-2"></div>

          <article
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post?.content?.rendered),
            }}
            className="prose lg:col-span-8 max-w-none prose-gray prose-blockquote:px-8 prose-blockquote:py-3 prose-blockquote:lg:text-xl prose-blockquote:font-medium prose-blockquote:text-gray-900 prose-blockquote:border-gray-900 prose-blockquote:border-l-2 prose-blockquote:lg:leading-9 prose-blockquote:not-italic prose-blockquote:bg-gray-100 prose-blockquote:text-lg prose-blockquote:leading-8"
          ></article>
        </div>
      </div>
      <Comments post={post} />
    </section>
  );
};
</>
export default Page;
*/}