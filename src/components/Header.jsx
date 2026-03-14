import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Header() {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await api.post("/logout", {});
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.removeItem("token");
            navigate("/");
        }
    };

    return (
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <div
                onClick={() => navigate("/")}
                className="text-xl font-bold text-blue-600 cursor-pointer"
            >Task Manager</div>
            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
            >
                Logout
            </button>
        </header>
    );
}