import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTaskForm = () => {
    const { id } = useParams();
    const [task, setTask] = useState({ title: "", description: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener la tarea");
                }
                const data = await response.json();
                setTask({ title: data.title, description: data.description });
            } catch (error) {
                console.error("Error al obtener la tarea:", error);
            }
        };

        if (id) {
            fetchTask();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                }),
            });

            if (!response.ok) {
                throw new Error("Error al editar la tarea");
            }

            navigate("/");
        } catch (error) {
            console.error("Error al editar la tarea:", error);
        }
    };

    return (
        <div className="bg-[#F9F7F7] p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-8">
            <h2 className="text-[#112D4E] text-2xl font-semibold mb-6">Editar Tarea</h2>
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
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};

export default EditTaskForm;
