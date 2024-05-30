import { useAuth } from "providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "components/Button";

const Dashboard = (): JSX.Element => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    toast.success("Success");
    toast.error("Error");
  };

  return (
    <>
      {JSON.stringify(user)}
      <Button onClick={logOut}>Выйти</Button>
      <Button onClick={handleClick}>Notify</Button>
      <Button
        onClick={() => navigate("/settings/myProfile", { replace: true })}
      >
        My Profile
      </Button>
      <Button onClick={() => navigate("/settings/group", { replace: true })}>
        Group Settings
      </Button>
    </>
  );
};

export default Dashboard;
