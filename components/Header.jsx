'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import profilePic from '../public/me.png';
import { getCategories } from '@/actions/wp.actions';
import { useEffect, useState } from 'react';
const Header = () => {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    const data = await getCategories();
    console.log(data);
    setCategories(data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <header className="py-4 bg-white border-b-4" x-data="{expanded: false}">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" title="" className="flex">
              <Image
                width={150}
                height={180}
                className=""
                src={profilePic}
                alt=""
              />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button type="button" className="text-gray-900">
              <span x-show="!expanded" aria-hidden="true">
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </span>

              <span x-show="expanded" aria-hidden="true">
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-12">
            {categories &&
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  title=""
                  className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  {category.name}
                </Link>
              ))}
          </nav>

          <nav className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-10">
            <Link
              href="#"
              title=""
              className="
                    inline-flex
                    items-center
                    justify-center
                    px-5
                    py-2
                    text-base
                    font-semibold
                    leading-7
                    text-gray-900
                    transition-all
                    duration-200
                    bg-transparent
                    border border-gray-900
                    rounded-xl
                    font-pj
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                    hover:bg-gray-900 hover:text-white
                    focus:bg-gray-900 focus:text-white
                "
              role="button"
            >
              Share Your Story
            </Link>
          </nav>
        </div>

        <nav className="hidden">
          <div className="px-1 py-8">
            <div className="grid gap-y-7">
              <a
                href="#"
                title=""
                className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {' '}
                Experts{' '}
              </a>

              <a
                href="#"
                title=""
                className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {' '}
                Community Groups{' '}
              </a>

              <a
                href="#"
                title=""
                className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {' '}
                Support{' '}
              </a>

              <a
                href="#"
                title=""
                className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {' '}
                Login{' '}
              </a>

              <a
                href="#"
                title=""
                className="
                        inline-flex
                        items-center
                        justify-center
                        px-5
                        py-2
                        text-base
                        font-semibold
                        leading-7
                        text-gray-900
                        transition-all
                        duration-200
                        bg-transparent
                        border border-gray-900
                        rounded-xl
                        font-pj
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                        hover:bg-gray-900 hover:text-white
                        focus:bg-gray-900 focus:text-white
                    "
                role="button"
              >
                Join community
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
