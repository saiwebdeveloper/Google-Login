import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Sign in with Google</h2>

      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const user = jwtDecode(credentialResponse.credential);

          localStorage.setItem("user", JSON.stringify(user));
          navigate("/home");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default Login;
