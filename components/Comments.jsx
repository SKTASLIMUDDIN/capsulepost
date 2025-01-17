import React from 'react';
import CommentList from './CommentList';
import { postComment } from '@/actions/wp.actions';
import { useState } from 'react';
const Comments = ({ post }) => {
  // {"post": "846",
  //     "author_name": "Snehal",
  //     "author_email": "snehal.tayde13@gmail.com",
  //     "content": "Test new 2"
  //   }

  const [content, setContent] = useState('');
  const [author_name, setAuthorName] = useState('CapsulePost');
  const [author_email, setAuthorEmail] = useState('capsulepost.in@gmail.com.com');
  const [postId, setPostId] = useState(post.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      post: post.id,
      author_name,
      author_email,
      content,
    };
    console.log('Data', data);
    const res = await postComment(data);
    console.log(res);
  };
  return (
    <>
      <div>
        <div className="py-8 bg-white">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            <div className="max-w-xl mx-auto">
              <div>
                <label
                  htmlFor=""
                  className="block text-sm font-bold text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    name=""
                    id=""
                    placeholder="Name"
                    rows="3"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg resize-y focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    onChange={(e) => setAuthorName(e.target.value)}
                  ></input>
                </div>
                <label
                  htmlFor=""
                  className="block text-sm font-bold text-gray-900"
                >
                  {' '}
                  Your Email{' '}
                </label>
                <div className="mt-2">
                  <textarea
                    name=""
                    id=""
                    placeholder="Share Your Thoughts"
                    rows="3"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg resize-y focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    onChange={(e) => setAuthorEmail(e.target.value)}
                  ></textarea>
                </div>
                <label
                  htmlFor=""
                  className="block text-sm font-bold text-gray-900"
                >
                  {' '}
                  Comment{' '}
                </label>
                <div className="mt-2">
                  <textarea
                    name=""
                    id=""
                    placeholder="Share Your Thoughts"
                    rows="3"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg resize-y focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {' '}
                    Add Comment{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommentList post={post} />
    </>
  );
};

export default Comments;
