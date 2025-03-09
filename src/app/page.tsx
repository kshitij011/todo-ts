// @ts-nocheck
"use client";

import { useState } from "react";
import toDoAbi from "./contractData/toDoAbi.json";
import { ethers, Contract } from "ethers";
import CreateTask from "@/components/createTask";
import MarkComplete from "@/components/markComplete";
import EditTask from "@/components/editTask";
import DeleteTask from "@/components/deleteTask";
import GetAllTask from "@/components/getAllTask";

export default function Home() {
    const [account, setAccount] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [toDo, setToDo] = useState<Contract>();

    const toDoAddress = "0x1c4654d9bdcfffe0b44688c9753c7bb915fc01cc";

    async function handleConnect() {
        try {
            if (!window.ethereum) {
                alert(
                    "MetaMask is not installed. Please install it to connect."
                );
                return;
            }

            setLoading(true);
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setAccount(accounts[0]);

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const loadToDo = new Contract(toDoAddress, toDoAbi.abi, signer);
            setToDo(loadToDo);
        } catch (error) {
            console.error("Error occurred: ", error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchTasks() {
        try {
            if (!toDo) {
                alert("Connect your wallet first!");
                return;
            }

            const tasks = await toDo.getAllTask();
            console.log("tasks", tasks);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    if (!account) {
        return (
            <button
                onClick={handleConnect}
                className="bg-orange-400 p-2 rounded text-gray-800 font-extrabold cursor-pointer"
            >
                {loading
                    ? "Connecting..."
                    : account
                    ? account.toString()
                    : "Connect Wallet"}
            </button>
        );
    }

    return (
        <>
            <div className="bg-blue-300 rounded w-1/2 h-auto p-3 flex flex-col items-center justify-center m-2">
                <button
                    onClick={handleConnect}
                    className="bg-orange-400 p-2 rounded text-gray-800 font-extrabold"
                >
                    {loading
                        ? "Connecting..."
                        : account
                        ? account.toString()
                        : "Connect"}
                </button>

                {toDo && <CreateTask toDo={toDo} />}

                {toDo && <MarkComplete toDo={toDo} />}

                {toDo && <EditTask toDo={toDo} />}

                {toDo && <DeleteTask toDo={toDo} />}
            </div>

            {/* Conditionally render GetAllTask only if toDo is defined */}
            {toDo && (
                <div className="bg-blue-300 rounded w-1/2 h-auto p-3 flex flex-col items-center justify-center m-2">
                    <GetAllTask toDo={toDo} />
                </div>
            )}
        </>
    );
}
