import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email:</label>
            <input className="auth-inp" type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <br />

            <label>Password:</label>
            <input className="auth-inp" type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <br />

            <button disabled={isLoading}>Login</button>
            {error && <div>{error}</div>}
            <br />
        </form>
    )
}

export default Login;