import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Welcome {user?.name}</h1>
      <img src={user?.picture} alt="profile" />
      <p>{user?.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
