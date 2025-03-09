// @ts-nocheck

"use client";
import { Contract } from "ethers";
import React, { useState } from "react";

interface Task {
    title: string;
    description: string;
    status: boolean; // Assuming status is a boolean (true = completed, false = incomplete)
}

function GetAllTask({ toDo }: { toDo: Contract }) {
    const [fetch, setFetch] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    async function getAllTasks() {
        try {
            setFetch(true);
            const tasks = await toDo.getAllTask();
            console.log("All tasks: ", tasks);

            // Filter out deleted tasks (empty objects with status false)
            const filteredTasks = tasks.filter(
                (task: Task) => task.title && task.description
            );

            setTasks(filteredTasks);
        } catch (error) {
            alert(`Error fetching tasks: ${error}`);
        } finally {
            setFetch(false);
        }
    }

    return (
        <div>
            <div className="flex w-full">
                <h1 className="text-gray-900 font-extrabold">Your Tasks</h1>
                <button
                    onClick={getAllTasks}
                    className="bg-blue-400 text-gray-800 font-extrabold p-1 rounded w-full ml-1 cursor-pointer"
                >
                    {fetch ? "Fetching..." : "Fetch Tasks"}
                </button>
            </div>
            {tasks.length > 0 ? (
                tasks.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-green-400 p-1 m-1 rounded"
                    >
                        <div>
                            <span className="text-gray-900 font-bold">
                                Title:{" "}
                            </span>
                            {item.title}
                        </div>
                        <div>
                            <span className="text-gray-900 font-bold">
                                Description:{" "}
                            </span>
                            {item.description}
                        </div>
                        <div>
                            <span className="text-gray-900 font-bold">
                                Status:{" "}
                            </span>
                            {item.status ? "Completed" : "Incomplete"}
                        </div>
                    </div>
                ))
            ) : (
                <div>No items</div>
            )}
        </div>
    );
}

export default GetAllTask;
