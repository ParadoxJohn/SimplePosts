import React, { useState, useEffect } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [updatingPostId, setUpdatingPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Posts:', data);
        setPosts(data);
      } catch (error) {
        console.error('Помилка отримання списку постів:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = async (newPost) => {
    try {
      const response = await fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data.message);
  
      if (updatingPostId) {
        // Якщо є updatingPostId, це оновлення, а не додавання
        const updatedPosts = posts.map((post) =>
          post._id === updatingPostId ? { ...post, title: newPost.title } : post
        );
        setPosts(updatedPosts);
  
        setUpdatingPostId(null);
      } else {
        // Інакше це додавання нового поста
        setPosts([...posts, data.post]);
      }
    } catch (error) {
      console.error('Помилка додавання поста:', error);
    }
  };
// eslint-disable-next-line no-unused-vars
  const handleUpdatePost = async (updatingPostId, updatedPost) => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${updatingPostId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data.message);
  
      const updatedPosts = posts.map((post) =>
        post._id === updatingPostId ? { ...post, title: updatedPost.title } : post
      );
      setPosts(updatedPosts);
  
      setUpdatingPostId(null);
    } catch (error) {
      console.error('Помилка оновлення поста:', error);
    }
  };


  const handleDeletePost = async (post) => {
    const { _id } = post;
    console.log('Deleting post with id:', _id);
  
    try {
      const response = await fetch(`http://localhost:8000/posts/${_id}`, {
      method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log(`Post with id ${_id} deleted successfully`);
  
      const updatedPosts = posts.filter((p) => p._id !== _id);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Помилка видалення поста:', error);
    }
  };
  

  const appStyle = {
    padding: '20px',
    backgroundColor: '#ecf0f1',
  };

  return (
    <div style={appStyle}>
      <PostForm
  onAddPost={handleAddPost}
  onUpdatePost={(updatedPost) => {
    if (updatingPostId) {
      const updatedPosts = posts.map((post) =>
        post._id === updatingPostId ? { ...post, ...updatedPost } : post
      );
      setPosts(updatedPosts);
      setUpdatingPostId(null);
    }
  }}
  initialPost={updatingPostId ? posts.find((post) => post._id === updatingPostId) : null}
  updatingPostId={updatingPostId} // Додаємо updatingPostId як пропс
/>
      <PostList
        posts={posts}
        onDelete={handleDeletePost}
        onUpdate={(postId) => setUpdatingPostId(postId)}
      />
    </div>
  );
};

export default App;