import { useAuth } from "providers/AuthProvider";
import { toast } from "react-toastify";

import Button from "components/Button";

const Dashboard = (): JSX.Element => {
  const { user, logOut } = useAuth();

  const handleClick = () => {
    toast.success("Success");
    toast.error("Error");
  };

  return (
    <>
      {JSON.stringify(user)}
      <Button onClick={logOut}>Выйти</Button>
      <Button onClick={handleClick}>Notify</Button>
    </>
  );
};

export default Dashboard;
