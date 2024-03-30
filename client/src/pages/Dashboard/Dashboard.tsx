import Button from "components/Button";
import { useAuth } from "providers/AuthProvider";

const Dashboard = (): JSX.Element => {
  const { user, logOut } = useAuth();

  return (
    <>
      {JSON.stringify(user)}
      <Button onClick={logOut}>Выйти</Button>
    </>
  );
};

export default Dashboard;
