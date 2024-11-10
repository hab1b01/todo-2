import { useState } from "react";
import axios from "axios";
import { UserContext } from "./userContext";
const url = process.env.REACT_APP_BASE_URL;

export default function UserProvider({ children }) {
  const userFromSessionStorage = sessionStorage.getItem("user");
  const [user, setUser] = useState(
    userFromSessionStorage
      ? JSON.parse(userFromSessionStorage)
      : { email: "", password: "" }
  );

  const signUp = async () => {
    const headers = { "Content-Type": "application/json" };
    await axios.post(`${url}/user/register`, user, headers);
    setUser({ email: "", password: "" });
  };

  const signIn = async () => {
    const headers = { "Content-Type": "application/json" };
    try {
      const response = await axios.post(`${url}/user/login`, user, headers);
      setUser(response.data);
      sessionStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      setUser({ email: "", id: "" });
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, signUp, signIn }}>
      {children}
    </UserContext.Provider>
  );
}
