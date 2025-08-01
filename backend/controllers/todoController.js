const Todo = require("../models/todoModel");

const getAllTodos = async (req, res) => {
    const todos = await Todo.find({});
    res.status(200).json(todos);
};

const createTodo = (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send("Title and description are required");
    }
    const newTodo = new Todo({ title, description });
    newTodo.save()
        .then(() => res.status(201).send(newTodo, "Todo created successfully"))
        .catch(err => res.status(500).send("Error creating todo: " + err.message));
}
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!title && !description && completed === undefined) {
        return res.status(400).send("At least one field is required to update");
    }

    Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true })
        .then(updatedTodo => {
            if (!updatedTodo) {
                return res.status(404).send("Todo not found");
            }
            res.status(200).json(updatedTodo);
        })
        .catch(err => res.status(500).send("Error updating todo: " + err.message));
}
const deleteTodo = (req, res) => {
    const { id } = req.params;

    Todo.findByIdAndDelete(id)
        .then(deletedTodo => {
            if (!deletedTodo) {
                return res.status(404).send("Todo not found");
            }
            res.status(200).json({ message: "Todo deleted successfully" });

        })
        .catch(err => res.status(500).send("Error deleting todo: " + err.message));
}
const completed = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { completed },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: 'Error updating todo', error: err.message });
    }
}

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    completed
}