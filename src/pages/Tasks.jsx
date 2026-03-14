import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import CommentSection from "../components/CommentSection";
import Header from "../components/Header";

export default function Tasks() {

    const { projectId } = useParams();

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("todo");
    const [editId, setEditId] = useState(null);

    const loadTasks = () => {

        api.get("/tasks")
            .then(res => {

                const filtered = res.data.data.filter(
                    t => t.project_id == projectId
                );

                setTasks(filtered);

            });

    };

    useEffect(() => {
        loadTasks();
    }, []);

    const saveTask = async () => {

        if (editId) {

            await api.put(`/tasks/${editId}`, {
                title,
                description,
                status
            });

        } else {

            await api.post("/tasks", {
                title,
                description,
                project_id: projectId
            });

        }

        setTitle("");
        setDescription("");
        setStatus("progress");
        setEditId(null);
        loadTasks();

    };

    const editTask = (task) => {

        setTitle(task.title);
        setDescription(task.description || "");
        setStatus(task.status);
        setEditId(task.id);

    };

    const deleteTask = async (id) => {

        await api.delete(`/tasks/${id}`);
        loadTasks();

    };

    const cancelEdit = () => {
        setTitle("");
        setDescription("");
        setStatus("todo");
        setEditId(null);
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-100 p-6">

                <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        Tasks
                    </h2>

                    <div className="flex flex-col gap-3 mb-6">

                        <input
                            value={title}
                            placeholder="Task title"
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        />

                        <textarea
                            value={description}
                            placeholder="Task description"
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 resize-none"
                        />

                        {editId && (
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2"
                            >
                                <option value="todo">Todo</option>
                                <option value="progress">Progress</option>
                                <option value="done">Done</option>
                            </select>
                        )}

                        <button
                            onClick={saveTask}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            {editId ? "Update Task" : "Create Task"}
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

                    <div className="space-y-4">

                        {tasks.map(task => (

                            <div
                                key={task.id}
                                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                            >

                                <div className="flex justify-between items-center mb-2">

                                    <h3 className="font-semibold text-gray-800">
                                        {task.title}
                                    </h3>

                                    <span
                                        className={`text-xs px-2 py-1 rounded text-white ${task.status === "done"
                                            ? "bg-green-500"
                                            : task.status === "progress"
                                                ? "bg-yellow-500"
                                                : "bg-gray-400"
                                            }`}
                                    >
                                        {task.status}
                                    </span>

                                </div>

                                {task.description && (
                                    <p className="text-gray-600 text-sm mb-3">
                                        {task.description}
                                    </p>
                                )}

                                <div className="flex gap-2 mb-3">

                                    <button
                                        onClick={() => editTask(task)}
                                        className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </div>

                                <CommentSection taskId={task.id} />

                            </div>

                        ))}

                    </div>

                </div>

            </div>
        </>
    );

}