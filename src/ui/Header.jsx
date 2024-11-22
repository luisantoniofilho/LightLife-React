import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.user.isLogged);
  const username = useSelector((state) => state.user.username);

  return (
    <header className="bg-green-600 p-3 flex justify-between items-center">
      {/* LightLife logo/title */}
      <span
        className="text-white p-2 text-xl font-bold hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        LightLife
      </span>

      {/* Display username when the user is logged */}
      {isLogged && (
        <div className="flex items-center space-x-4">
          <span className="text-white text-lg font-medium">
            Olá, {username}!
          </span>
        </div>
      )}
    </header>
  );
}

export default Header;
