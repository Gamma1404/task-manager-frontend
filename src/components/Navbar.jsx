import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-[#112D4E] text-[#F9F7F7] p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Task Manager</h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:text-[#DBE2EF] transition">
                            Home
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;