import { useState } from "react";
import PropTypes from "prop-types";
import { isAuthenticated } from "./AuthService";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";


const PostCard = ({ post, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete(post.id);
  };

  const handleEdit = () => {
    onEdit(post.id);
  };

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card bg-base-100 shadow-lg rounded-lg overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-300 mb-4 line-clamp-1">
          {post.description}
        </p>


        {isAuthenticated() && (
          <div className="flex justify-between mt-4">

            <button
              onClick={handleViewDetails}
              className="btn btn-info btn-sm flex items-center gap-2"
            >
              <FaEye /> View Details
            </button>

            <div className="flex justify-between w-24">
              <button
                onClick={handleEdit}
                className="btn btn-primary btn-sm flex items-center gap-2"
              >
                <FaEdit /> 
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-error btn-sm flex items-center gap-2"
              >
                <FaTrash /> 
              </button>
            </div>
          </div>
        )}

        {isModalOpen && (
       <div className="modal modal-open">
       <div className="modal-box">
         <h3 className="font-bold text-white">{post.title}</h3>
         <img
           src={post.image}
           alt={post.title}
           className="w-full h-60 object-cover my-4"
         />
         <p className="py-4 overflow-auto whitespace-pre-wrap">{post.description}</p>
         <div className="modal-action">
           <button
             className="btn btn-secondary"
             onClick={handleCloseModal}
           >
             Close
           </button>
         </div>
       </div>
     </div>
     
        
        )}
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default PostCard;
