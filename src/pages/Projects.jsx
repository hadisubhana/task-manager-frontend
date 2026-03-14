import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Projects() {

    const [projects, setProjects] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [editId, setEditId] = useState(null);

    const loadProjects = () => {
        api.get("/projects")
            .then(res => setProjects(res.data.data));
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const saveProject = async () => {

        const payload = { name, description };

        if (editId) {
            await api.put(`/projects/${editId}`, payload);
        } else {
            await api.post("/projects", payload);
        }

        setName("");
        setDescription("");
        setEditId(null);
        loadProjects();
    };

    const editProject = (p) => {
        setName(p.name);
        setDescription(p.description || "");
        setEditId(p.id);
    };

    const deleteProject = async (id) => {
        await api.delete(`/projects/${id}`);
        loadProjects();
    };

    const cancelEdit = () => {
        setName("");
        setDescription("");
        setEditId(null);
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-100 p-6">

                <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        Projects
                    </h2>

                    <div className="flex flex-col gap-3 mb-6">

                        <input
                            value={name}
                            placeholder="Project name"
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <textarea
                            value={description}
                            placeholder="Project description"
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />

                        <button
                            onClick={saveProject}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            {editId ? "Update Project" : "Create Project"}
                        </button>

                        {editId && (
                            <button
                                onClick={cancelEdit}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                    <div className="space-y-3">

                        {projects.map(p => (
                            <div
                                key={p.id}
                                className="flex flex-col border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50"
                            >

                                <Link
                                    to={`/tasks/${p.id}`}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    {p.name}
                                </Link>

                                {p.description && (
                                    <p className="text-gray-600 text-sm mt-1">
                                        {p.description}
                                    </p>
                                )}

                                <div className="flex gap-2 mt-2">

                                    <button
                                        onClick={() => editProject(p)}
                                        className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteProject(p.id)}
                                        className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </>
    );

}