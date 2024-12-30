import { useNavigate } from "react-router-dom";

const Task = ({ task }) => {
    const navigate = useNavigate();

    const handleToggle = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${task._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: !task.completed }),
            });

            if (!response.ok) {
                throw new Error("Error al cambiar el estado de la tarea");
            }

            window.location.reload();
        } catch (error) {
            console.error("Error al marcar la tarea:", error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${task._id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${task._id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Error al eliminar la tarea");
            }
            window.location.reload();
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    const date = new Date(task.createdAt);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return (
        <div key={task._id} className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center justify-between">
            <div className="flex items-center">
                <button
                    onClick={handleToggle}
                    className={`w-6 h-6 border-2 rounded-full ${task.completed ? 'bg-[#3F72AF] border-[#3F72AF]' : 'border-[#112D4E]'} transition-colors mr-4`}
                ></button>
                <div>
                    <h3 className="text-[#112D4E] text-xl font-semibold">{task.title}</h3>
                    <p className="text-[#3F72AF]">Estado: {task.completed ? 'Completado' : 'Pendiente'}</p>
                    <p className="text-[#3F72AF]">Fecha de creación: {formattedDate}</p>
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <button
                    onClick={handleEdit}
                    className="bg-[#3F72AF] text-[#F9F7F7] px-4 py-2 rounded-lg hover:bg-[#DBE2EF] transition"
                >
                    Editar
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-[#DBE2EF] text-[#112D4E] px-4 py-2 rounded-lg hover:bg-[#3F72AF] transition"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default Task;