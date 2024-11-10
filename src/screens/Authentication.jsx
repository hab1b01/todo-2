import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser";

export const AuthenticationMode = Object.freeze({
  Login: "Login",
  Register: "Register",
});

export default function Authentication({ authenticationMode }) {
  const { user, setUser, signUp, signIn } = useUser();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authenticationMode === AuthenticationMode.Register) {
        await signUp();
        navigate("/signin");
      } else {
        await signIn();
        navigate("/");
      }
    } catch (error) {
      const message = error.response?.data ? error.response.data.error : error;
      alert(message);
    }
  };
  return (
    <div>
      <h3>
        {authenticationMode === AuthenticationMode.Login
          ? "Sign in"
          : "Sign up"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            name="email"
            id="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <div>
          <button type="submit">
            {authenticationMode === AuthenticationMode.Login
              ? "Login"
              : "Submit"}
          </button>
        </div>
        <div>
          <Link
            to={
              authenticationMode === AuthenticationMode.Login
                ? "/signup"
                : "/signin"
            }
          >
            {authenticationMode === AuthenticationMode.Login
              ? "No account? Sign up"
              : "Already signed up? Sign in"}
          </Link>
        </div>
      </form>
    </div>
  );
}
