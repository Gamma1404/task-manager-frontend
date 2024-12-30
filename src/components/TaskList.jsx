import { useState, useEffect } from "react";
import Task from "./Task";
import { useNavigate } from "react-router-dom";

const TaskList = ({ tasks, setTasks }) => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchTasks = async () => {
            let response;
            if (filter === "all") {
                response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`);
            } else {
                response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks?status=${filter}`);
            }

            if (!response) {
                throw new Error("Error al traer las tareas");
            }

            const data = await response.json();
            setTasks(data);
        };

        fetchTasks();
    }, [filter, setTasks]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9F7F7]">
            <div className="p-6 bg-white rounded-lg shadow-md w-full sm:max-w-xl lg:max-w-2xl min-h-screen mx-4">
                <h1 className="text-3xl font-semibold text-[#3F72AF] mb-4">Lista de Tareas</h1>
                <div className="mb-4">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 bg-[#DBE2EF] border border-[#3F72AF] rounded-md shadow-sm"
                    >
                        <option value="all">Todas</option>
                        <option value="completed">Completadas</option>
                        <option value="pending">Pendientes</option>
                    </select>
                </div>
                <div>
                    {tasks.length === 0 ? (
                        <p className="text-lg text-gray-700">No hay tareas</p>
                    ) : (
                        tasks.map((task) => (
                            <Task key={task._id} task={task} />
                        ))
                    )}
                </div>
                <button
                    onClick={() => navigate("/new")}
                    className="mt-4 px-6 py-2 bg-[#3F72AF] text-white font-semibold rounded-md shadow-md hover:bg-[#112D4E]"
                >
                    Agregar tarea
                </button>
            </div>
        </div>
    );
};

export default TaskList;
