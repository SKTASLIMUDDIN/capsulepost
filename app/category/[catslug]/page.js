'use client';
import { getPostsByCategoryName } from '@/actions/wp.actions';
import { useEffect, useState } from 'react';
import Postgrid from '@/components/Postgrid';
import HomeTitle from '@/components/HomeTitle';
import { NextSeo } from 'next-seo';

export default function Page({ params }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const displayPosts = async () => {
    setLoading(true);
    const data = await getPostsByCategoryName(params.catslug, page);
    setPosts(data.posts);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    displayPosts();
  }, [page, params]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const currentCategory = params.catslug.replace(/-/g, ' ').toUpperCase(); // Convert slug to a readable format

  return (
    <>
      <NextSeo
        title={`Posts in ${currentCategory} | Your Blog Name`}
        description={`Discover all posts under the ${currentCategory} category. Explore articles and insights on ${currentCategory}.`}
        openGraph={{
          title: `Posts in ${currentCategory}`,
          description: `Explore all posts in the ${currentCategory} category.`,
          url: `https://yourdomain.com/category/${params.catslug}`,
          type: 'website',
        }}
        additionalLinkTags={[
          page > 1 && { rel: 'prev', href: `https://yourdomain.com/category/${params.catslug}?page=${page - 1}` },
          page < totalPages && { rel: 'next', href: `https://yourdomain.com/category/${params.catslug}?page=${page + 1}` },
        ].filter(Boolean)} // Only add rel links if they exist
      />

      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <nav className="flex items-center justify-center">
            <ol className="flex items-center space-x-2">
              <li>
                <a
                  href="/"
                  title="Home"
                  className="text-base font-medium text-gray-900"
                >
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  /{' '}
                  <a
                    href={`/category/${params.catslug}`}
                    title={currentCategory}
                    className="ml-2 text-base font-medium text-gray-500"
                  >
                    {currentCategory}
                  </a>
                </div>
              </li>
            </ol>
          </nav>

          <HomeTitle title={`Category: ${currentCategory}`} />

          <div className="grid max-w-md grid-cols-1 mx-auto mt-12 sm:mt-16 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none">
            {loading ? (
              <p>Loading...</p>
            ) : posts?.length ? (
              posts.map((post) => <Postgrid key={post.id} post={post} />)
            ) : (
              <p>No Posts Found in {currentCategory}.</p>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}


{/*'use client';
import { getPostsByCategoryName } from '@/actions/wp.actions';
import { useEffect, useState } from 'react';
import Postgrid from '@/components/Postgrid';
import HomeTitle from '@/components/HomeTitle';
export default function Page({ params }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const displayPosts = async () => {
    setLoading(true);
    const data = await getPostsByCategoryName(params.catslug, page);
    console.log(data);
    setPosts(data.posts);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    displayPosts();
  }, [page, params]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <>
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <HomeTitle />
          <div className="grid max-w-md grid-cols-1 mx-auto mt-12 sm:mt-16 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none">
            {loading ? (
              <p>Loading...</p>
            ) : posts?.length ? (
              posts.map((post) => <Postgrid key={post.id} post={post} />)
            ) : (
              <p>No Posts</p>
            )}
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
*/}
