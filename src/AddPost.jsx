import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { getCurrentUser } from './AuthService';

const AddPost = () => {
  const [post, setPost] = useState({ title: '', description: '', image: '' });
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleAddPost = (e) => {
    e.preventDefault();
    const newPost = { ...post, author: user.email };
    axios.post('http://localhost:3000/posts', newPost).then(() => {
      navigate("/");
      setPost({ title: '', description: '', image: '' }); 
    }).catch((error) => {
      console.error('Error adding post:', error);
      alert('Failed to add post');
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
      <form onSubmit={handleAddPost} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            placeholder="Image URL"
            value={post.image}
            onChange={(e) => setPost({ ...post, image: e.target.value })}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
