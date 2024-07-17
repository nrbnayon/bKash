import { useRole } from "./../../hooks/useRole";
const Home = () => {
  const { role } = useRole();
  return (
    <div>
      <p className="text-4xl">Bkash Body component</p>
      <p>My role: {role}</p>
    </div>
  );
};

export default Home;
