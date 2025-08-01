import React, { useState, useEffect } from 'react';
import { fetchTodos, deleteTodo, updateTodo, addTodo, toggleTodoCompletion } from '../api/todoApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const data = await fetchTodos();
                if (Array.isArray(data)) {
                    setTodos(data);
                } else {
                    console.error("Expected array but got:", data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadTodos();
    }, []);

    const handleAdd = async () => {
        if (!newTitle.trim() || !newDesc.trim()) {
            toast.error("Title and Description cannot be empty");
            return;
        }

        const newTodo = await addTodo(newTitle, newDesc);
        setTodos([...todos, newTodo]);
        setNewTitle('');
        setNewDesc('');
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    const handleToggleComplete = async (id, completed) => {
        const updatedTodo = await toggleTodoCompletion(id, !completed);
        setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    };

    if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
                <ToastContainer position="top-right" autoClose={3000} />
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Todo List</h1>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Title"
                        className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="text"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="Description"
                        className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded transition"
                    >
                        Add
                    </button>
                </div>

                <ul className="space-y-4">
                    {todos.map((todo) => (
                        <li
                            key={todo._id}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-lg p-4 shadow-sm bg-gray-50"
                        >
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-black-800">{todo.title}</h3>
                                <p className="text-sm text-black-500">{todo.description}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-3 sm:mt-0 sm:ml-4">
                                <span className={`text-sm font-semibold ${todo.completed ? 'text-green-600' : 'text-red-500'}`}>
                                    {todo.completed ? 'Completed' : 'Pending'}
                                </span>
                                <button
                                    onClick={() => handleDelete(todo._id)}
                                    className="bg-red-500 hover:bg-red-600 text-black px-3 py-1 rounded text-sm"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleToggleComplete(todo._id, todo.completed)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm"
                                >
                                    {todo.completed ? 'Undo' : 'Complete'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}

export default TodoApp;
