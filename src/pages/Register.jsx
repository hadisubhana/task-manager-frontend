import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const register = async () => {

        try {
            const res = await api.post("/register", { name, email, password });
            navigate("/");
        } catch (err) {
            alert("Register failed");
        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">

                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
                    Register
                </h2>

                <div className="flex flex-col gap-4">

                    <input
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

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
                        onClick={register}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                    >
                        Register
                    </button>

                    <p className="text-sm text-center text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="/"
                            className="text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>

    );

}