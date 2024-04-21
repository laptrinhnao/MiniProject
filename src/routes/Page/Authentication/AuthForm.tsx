import Wrapper from "@/components/Wrapper";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register/Register";

const AuthForm = () => {
  const path = useLocation();
  return (
    <Wrapper className="authenform bg-gray-100">
      {path.pathname === "/auth/login" ? (
        <Login />
      ) : path.pathname === "/auth/register" ? (
        <Register />
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

export default AuthForm;
