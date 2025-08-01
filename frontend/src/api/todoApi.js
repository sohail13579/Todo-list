
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchTodos() {
    try {
        const response = await fetch(`${API_URL}/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Failed to fetch todos:', error);
        throw error;
    }
}

export async function addTodo(todoText, todoDes) {
    try {
        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: todoText, description: todoDes }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Failed to add todo:', error);
        throw error;
    }
}

export async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Failed to delete todo:', error);
        throw error;
    }
}

export async function updateTodo(id, updatedTodo) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Failed to update todo:', error);
        throw error;
    }
}

export async function toggleTodoCompletion(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}/completed`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Failed to toggle todo completion:', error);
        throw error;
    }
}
