import React, { useState, useEffect } from 'react';

const PostForm = ({ onAddPost, onUpdatePost, initialPost }) => {
  const [newPost, setNewPost] = useState({ title: '', description: '', author: '' });

  useEffect(() => {
    // Якщо initialPost змінюється, встановлюємо новий пост у стан
    if (initialPost) {
      setNewPost(initialPost);
    } else {
      // Якщо initialPost не визначено, скидаємо значення на пустий об'єкт
      setNewPost({ title: '', description: '', author: '' });
    }
  }, [initialPost]);

  const handleAdd = () => {
    onAddPost(newPost);
    setNewPost({ title: '', description: '', author: '' });
  };

  const handleUpdate = () => {
    // Перевіряємо, чи існує onUpdatePost та чи передано initialPost
    if (onUpdatePost && initialPost) {
      onUpdatePost(initialPost._id, newPost);
      setNewPost({ title: '', description: '', author: '' });
    }
  };

  const formStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    borderRadius: '3px',
  };

  const buttonStyle = {
    backgroundColor: '#3498db', 
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    marginRight: '10px',
  };

  return (
    <div style={formStyle}>
      <label style={labelStyle}>Title:</label>
      <input
        type="text"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        style={inputStyle}
      />

      <label style={labelStyle}>Description:</label>
      <input
        type="text"
        value={newPost.description}
        onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
        style={inputStyle}
      />

      <label style={labelStyle}>Author:</label>
      <input
        type="text"
        value={newPost.author}
        onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
        style={inputStyle}
      />

      <button  onClick={onAddPost ? handleAdd : handleUpdate} style={buttonStyle}>
        {onAddPost ? 'Додати пост' : 'Оновити пост'}
      </button>
    </div>
  );
};

export default PostForm;