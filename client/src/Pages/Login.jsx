const Login = ({ setIsConnected }) => {
  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={() => {
          setIsConnected(true);
        }}
      >
        Connect
      </button>
    </div>
  );
};

export default Login;
