import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.user.isLogged);
  const username = useSelector((state) => state.user.username);

  return (
    <header className="flex items-center justify-between bg-green-600 p-3">
      {/* LightLife logo/title */}
      <span
        className="px-4 py-2 text-xl font-bold text-white hover:cursor-pointer md:text-3xl"
        onClick={() => navigate("/")}
      >
        LightLife
      </span>

      {/* Display username when the user is logged */}
      {isLogged && (
        <div className="flex items-center px-4">
          <span className="text-lg font-medium text-white md:text-2xl">
            Olá, {username}!
          </span>
        </div>
      )}
    </header>
  );
}

export default Header;
