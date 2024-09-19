import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', image: '', description: '' });
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/posts/${id}`, post);
      navigate('/'); 
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  if (!post) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="text"
            name="image"
            value={post.image}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            value={post.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-40"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPost;
