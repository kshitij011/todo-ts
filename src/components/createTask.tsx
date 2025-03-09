// @ts-nocheck

"use client";

import { Contract } from "ethers";
import React, { useState } from "react";

function CreateTask({ toDo }: { toDo: Contract }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    async function createTask() {
        try {
            setLoading(true);
            if (title.length && description.length) {
                const task = await toDo.addTask(title, description);
                task.wait();
                console.log("task", task);
            } else {
                alert("Invalid input!");
            }
        } catch (error) {
            alert(`Cannot create task: ${error}`);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="bg-blue-200 p-2 rounded flex m-2">
            <div>
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
                onClick={createTask}
                className="bg-blue-400 text-gray-800 font-extrabold p-1 rounded w-full ml-1 cursor-pointer"
            >
                {loading ? "Creating..." : "Create Task"}
            </button>
        </div>
    );
}

export default CreateTask;
