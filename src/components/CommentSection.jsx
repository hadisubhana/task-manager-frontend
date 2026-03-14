import { useEffect, useState } from "react";
import api from "../api/api";

export default function CommentSection({ taskId }) {

    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    const loadComments = () => {

        api.get(`/tasks/${taskId}/comments`)
            .then(res => setComments(res.data));

    };

    useEffect(() => {
        loadComments();
    }, []);

    

    const createComment = async () => {

        await api.post("/comments", {
            task_id: taskId,
            content
        });

        setContent("");
        loadComments();

    };

    const deleteComment = async (id) => {

        await api.delete(`/comments/${id}`);
        loadComments();

    };

    return (

        <div className="mt-4 border-t pt-3">

            <h4 className="font-medium text-gray-700 mb-3">
                Comments
            </h4>

            <div className="space-y-2 mb-3">

                {comments.map(c => (

                    <div
                        key={c.id}
                        className="flex justify-between items-center bg-white border border-gray-200 rounded-lg px-3 py-2"
                    >

                        <span className="text-sm text-gray-700">
                            {c.content}
                        </span>

                        <button
                            onClick={() => deleteComment(c.id)}
                            className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

            <div className="flex gap-2">

                <input
                    value={content}
                    placeholder="Write a comment..."
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={createComment}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
                >
                    Add
                </button>

            </div>

        </div>

    );

}