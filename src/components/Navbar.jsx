import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <header>
        <Link to="/">
            <h1>Dex App</h1>
        </Link>
        {user && (
          <div className="button">
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
    </header>
  )
}

export default Navbar;