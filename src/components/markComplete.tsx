// @ts-nocheck

"use client";
import { Contract } from "ethers";
import React, { useState } from "react";

function MarkComplete({ toDo }: { toDo: Contract }) {
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleMarkComplete() {
        try {
            setLoading(true);
            if (Number(id)) {
                const res = await toDo.markComplete(id);
            } else {
                alert("Input valid number");
            }
        } catch (error) {
            alert(`Cannot mark complete: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-blue-200 p-2 rounded flex m-2">
            <input
                type="number"
                placeholder="Task Id..."
                className="p-2 font-bold bg-gray-400 m-1 rounded"
                onChange={(e) => setId(e.target.value)}
            />

            <button
                onClick={handleMarkComplete}
                className="bg-blue-400 text-gray-800 font-extrabold p-1 rounded w-full ml-1 cursor-pointer"
            >
                {loading ? "Marking Complete..." : "Mark Complete"}
            </button>
        </div>
    );
}

export default MarkComplete;
