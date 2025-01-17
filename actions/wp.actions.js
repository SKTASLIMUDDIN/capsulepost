'use server';

// Load environment variables (if necessary for your setup)
// If using a tool like Next.js, environment variables are loaded automatically.
const API_BASE_URL = process.env.API_BASE_URL  //'https://capsulepost.in/wp-json/wp/v2';

export async function getPosts(page, perPage = 12) {
  const res = await fetch(
    `${API_BASE_URL}/posts?page=${page}&per_page=${perPage}&_embed`
  );
  const posts = await res.json();
  const totalPages = res.headers.get('X-WP-TotalPages');
  return { posts, totalPages: parseInt(totalPages, 10) };
}

export async function getPost(slug) {
  const res = await fetch(
    `${API_BASE_URL}/posts?slug=${slug}&_embed`
  );
  const post = await res.json();
  return post;
}

export async function getPostsByCategoryName(categoryName, page, perPage = 12) {
  try {
    const categoryResponse = await fetch(
      `${API_BASE_URL}/categories?slug=${categoryName}`
    );
    const categories = await categoryResponse.json();

    if (categories.length === 0) {
      console.log('Category not found');
      return [];
    }

    const categoryId = categories[0].id;

    const postsResponse = await fetch(
      `${API_BASE_URL}/posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_embed`
    );
    const posts = await postsResponse.json();
    const totalPages = postsResponse.headers.get('X-WP-TotalPages');
    return { posts, totalPages: parseInt(totalPages, 10) };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/categories`);
  const categories = await res.json();
  return categories;
}

export async function getCommentss(postId) {
  const res = await fetch(
    `${API_BASE_URL}/comments?post=${postId}`
  );
  const comments = await res.json();
  return comments;
}

export async function postComment(data) {
  const res = await fetch(`${API_BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post: data.post,
      author_name: data.author_name,
      author_email: data.author_email,
      content: data.content,
    }),
  });
  const comments = await res.json();
  console.log(comments);
  return comments;
}


{/*'use server';

export async function getPosts(page, perPage = 12) {
  const res = await fetch(
    `https://capsulepost.in/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`
  );
  const posts = await res.json();
  //return posts;
  const totalPages = res.headers.get('X-WP-TotalPages');
  return { posts, totalPages: parseInt(totalPages, 10) };
}

export async function getPost(slug) {
  const res = await fetch(
    `https://capsulepost.in//wp-json/wp/v2/posts?slug=${slug}&_embed`
  );
  const post = await res.json();
  return post;
}

export async function getPostsByCategoryName(categoryName, page, perPage = 12) {
  try {
    // Get the category by slug
    const categoryResponse = await fetch(
      `https://capsulepost.in/wp-json/wp/v2/categories?slug=${categoryName}`
    );
    const categories = await categoryResponse.json();

    // Check if the category exists
    if (categories.length === 0) {
      console.log('Category not found');
      return [];
    }

    const categoryId = categories[0].id;

    // Get posts by category ID
    const postsResponse = await fetch(
      `https://capsulepost.in/wp-json/wp/v2/posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_embed`
    );
    const posts = await postsResponse.json();
    const totalPages = postsResponse.headers.get('X-WP-TotalPages');
    return { posts, totalPages: parseInt(totalPages, 10) };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getCategories() {
  const res = await fetch(`https://capsulepost.in/wp-json/wp/v2/categories`);
  const categories = await res.json();
  return categories;
}

export async function getCommentss(postId) {
  const res = await fetch(
    `https://capsulepost.in/wp-json/wp/v2/comments?post=${postId}`
  );
  const comments = await res.json();
  return comments;
}

export async function postComment(data) {
  const res = await fetch(`https://capsulepost.in/wp-json/wp/v2/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      post: data.post,
      author_name: data.author_name,
      author_email: data.author_email,
      content: data.content,
    }),
  });
  const comments = await res.json();
  console.log(comments);
  return comments;
*/}


