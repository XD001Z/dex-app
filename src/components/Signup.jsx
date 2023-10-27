import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        signup(email, password);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>Email:</label>
            <input className="auth-inp" type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <br />

            <label>Password:</label>
            <input className="auth-inp" type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <br />

            <button disabled={isLoading}>Sign Up</button>
            {error && <div>{error}</div>}
            <br />
        </form>
    )
}

export default Signup;