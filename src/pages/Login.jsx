import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {

        try {
            const res = await api.post("/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/projects");
        } catch (err) {
            alert("Invalid credentials");
        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">

                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
                    Login
                </h2>

                <div className="flex flex-col gap-4">

                    <input
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={login}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                    >
                        Login
                    </button>

                    <p className="text-sm text-center text-gray-500">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:underline"
                        >
                            Register
                        </Link>
                    </p>

                </div>

            </div>

        </div>

    );

}