// hier ist nur eine Vorlage, wird später gelöscht

import { useAuth } from "../context/AuthProvider";

const Sami = () => {
  const { userData } = useAuth();
  console.log("userData", userData);
  return <div>Hallo, {userData.username}</div>;
};

export default Sami;
