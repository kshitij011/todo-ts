// @ts-nocheck

"use client";
import { Contract } from "ethers";
import React, { useState } from "react";

function EditTask({ toDo }: { toDo: Contract }) {
    const [id, setId] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleEditTask() {
        try {
            setLoading(true);

            if (title && description && Number(id)) {
                const task = await toDo.editTask(id, title, description);
                console.log("task", task);
            } else {
                alert("Invalid input!");
            }
        } catch (error) {
            alert(`Cannot edit task: ${error}`);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="bg-blue-200 p-2 rounded flex m-2">
            <div>
                <input
                    type="number"
                    placeholder="Task Id..."
                    className="p-2 font-bold bg-gray-400 m-1 rounded"
                    onChange={(e) => setId(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Title..."
                    className="p-2 font-bold bg-gray-400 m-1 rounded"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Description..."
                    className="p-2 font-bold bg-gray-400 m-1 rounded"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <button
                onClick={handleEditTask}
                className="bg-blue-400 text-gray-800 font-extrabold p-1 rounded w-full ml-1 cursor-pointer"
            >
                {loading ? "Editing..." : "Edit Task"}
            </button>
        </div>
    );
}

export default EditTask;
