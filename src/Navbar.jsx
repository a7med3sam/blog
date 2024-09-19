import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "./AuthService";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4">
    <div className="navbar bg-base-100">
      <div className="container">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white">My Blog</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
         
          {isAuthenticated() && (
            <>
              <li><Link to="/add-post" className="btn btn-outline btn-warning mr-5 px-10">
              Add Post
              </Link></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary mr-5"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!isAuthenticated() && <li className="btn btn-outline btn-accent "><Link to="/login">Login</Link></li>}
          
          <li className="btn btn-outline btn-accent"><Link to="/register">Register</Link></li>
        </ul>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Navbar;
