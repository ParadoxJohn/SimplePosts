import React from 'react';

const PostList = ({ posts, onDelete, onUpdate }) => {
  const listStyle = {
    listStyle: 'none',
    padding: 0,
  };

  const itemStyle = {
    marginBottom: '8px',
    backgroundColor: '#f0f0f0', 
    padding: '10px',
    borderRadius: '5px',
  };


  const buttonStyle = {
    backgroundColor: '#3498db', 
    color: '#fff',
    padding: '5px 10px',
    marginRight:'5px',
    marginTop:'5px',
    borderRadius: '3px',
    cursor: 'pointer',
    border: 'none',
  };


  return (
    <ul style={listStyle}>
      {posts.map((post) => (
        <li key={post._id} style={itemStyle}>
          <div >
            <strong>{post.title}</strong>
            <p>{post.description}</p>
            <p>Author: {post.author}</p>
          </div>
          <button  style={buttonStyle}  onClick={() => onDelete(post)}> Видалити</button>
          <button  style={buttonStyle}  onClick={() => onUpdate(post._id)}>Оновити</button>
        </li>
      ))}
    </ul>
  );
};

export default PostList;