import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ setTasks }) => {
    const [task, setTask] = useState({ title: "", description: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error("Error al crear la tarea");
            }

            const newTask = await response.json();
            setTasks((tasks) => [...tasks, newTask]);
            navigate("/");
        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
    };

    return (
        <div className="bg-[#F9F7F7] p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-8">
            <h2 className="text-[#112D4E] text-2xl font-semibold mb-6">Crear Nueva Tarea</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-[#3F72AF] font-medium">Título:</label>
                    <input
                        type="text"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        placeholder="Título de la tarea"
                        required
                        className="w-full p-3 border-2 border-[#DBE2EF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F72AF] transition"
                    />
                </div>
                <div>
                    <label className="block text-[#3F72AF] font-medium">Descripción:</label>
                    <input
                        type="text"
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        placeholder="Descripción de la tarea"
                        className="w-full p-3 border-2 border-[#DBE2EF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F72AF] transition"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#3F72AF] text-[#F9F7F7] py-3 rounded-lg hover:bg-[#112D4E] transition"
                >
                    Crear
                </button>
            </form>
        </div>
    );
};

export default TaskForm;