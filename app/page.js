'use client';
import { getPosts } from '@/actions/wp.actions';
import { useEffect, useState, useCallback } from 'react';
import Postgrid from '@/components/Postgrid';
import HomeTitle from '@/components/HomeTitle';
import { NextSeo } from 'next-seo';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const res = await getPosts(page);

    if (res?.posts?.length) {
      setPosts((prevPosts) => [...prevPosts, ...res.posts]);
    }

    if (page >= (res?.totalPages || 1)) {
      setHasMore(false);
    }

    setLoading(false);
  }, [page, hasMore, loading]);

  // Fetch initial posts
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  return (
    <>
      {/* SEO Metadata */}
      <NextSeo
        title="Your Blog Name - Explore Insightful Articles on Every Topic"
        description="Stay informed with top-quality articles on technology, lifestyle, business, and more. Your go-to platform for engaging and reliable content."
        openGraph={{
          title: "Your Blog Name - Explore Insightful Articles on Every Topic",
          description:
            "Stay informed with top-quality articles on technology, lifestyle, business, and more. Your go-to platform for engaging and reliable content.",
          url: "https://yourdomain.com",
          type: "website",
        }}
      />

      {/* Main Content */}
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {/* Home Title */}
          <HomeTitle />

          {/* Posts Grid */}
          <div className="grid max-w-md grid-cols-1 mx-auto mt-12 sm:mt-16 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none">
            {posts.map((post) => (
              <Postgrid key={post.id} post={post} />
            ))}
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center mt-8">
              <p>Loading more posts...</p>
            </div>
          )}

          {/* End Message */}
          {!hasMore && !loading && (
            <div className="text-center mt-8">
              <p className="text-gray-500">No more posts to load.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}



{/*'use client';
import { getPosts } from '@/actions/wp.actions';
import { useEffect, useState } from 'react';
import Postgrid from '@/components/Postgrid';
import HomeTitle from '@/components/HomeTitle';
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const allPosts = async () => {
    setLoading(true);
    const res = await getPosts(page);
    // console.log(res);
    setPosts(res.posts);
    setLoading(false);

    const totalPages = res?.totalPages;
    setTotalPages(totalPages);
  };

  const allMedia = async (id) => {
    const data = await getMediaURL(id);
    return data;
  };

  useEffect(() => {
    allPosts();
  }, [page]);

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
            ) : posts.length ? (
              posts.map((post) => (
                <Postgrid
                  key={post.id}
                  post={post}
                  featured_media={post.featured_media}
                  allMedia={allMedia}
                />
              ))
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
