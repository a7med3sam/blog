import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './Posts';
import EditPost from './EditPost';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import AddPost from './AddPost';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </Router>
  );
}

export default App;
