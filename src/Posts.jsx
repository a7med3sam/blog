import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      fetchPosts(); 
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  return (
    <div className="container mx-auto px-4">
    <div className="p-4 max-w-7xl mx-auto">
      {posts.length === 0 ? (
        <p className="text-center text-xl font-semibold mt-8">No post yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onEdit={handleEdit} 
            />
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Posts;
