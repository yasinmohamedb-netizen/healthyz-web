import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function useRequireLogin() {
  const navigate = useNavigate();
  const auth = getAuth();

  return (beforeRedirect = null) => {
    if (auth.currentUser) return true;

    if (beforeRedirect) beforeRedirect();

    navigate("/login?redirectBack=true");

    return false;
  };
}
