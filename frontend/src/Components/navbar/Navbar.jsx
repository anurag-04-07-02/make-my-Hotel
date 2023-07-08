import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { user } = useContext(AuthContext);

  const navigate = useNavigate()
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    try {
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">make my Hotel</span>
        </Link>

        {user ? (
          <div className="login">
            <h3>{user.username}</h3>
            <button onClick={handleClick}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
            <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
            <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
