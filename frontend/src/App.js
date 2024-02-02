import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  //here what we do is connect to db and hit endpoints
  //we will use fetch

  //first lets get all todos data
  const fetchAllTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/todos");
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error("couldnt get data:", error);
    }
  };
  useEffect(() => {
    fetchAllTodos();
  }, []);

  //lets hit endpoint to post / add data
  const addTodo = async () => {
    try {
      const response = await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setTodo({});
    } catch (error) {
      console.error("couldnt add ..", error);
    }
  };

  //delete
  const deleteTodo = async (id) => {
    console.log("delet is called with id", id);
    try {
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("couldnt delete todo:", error);
    }
  };
  //make complete
  const doneTodo = (id) => {
    try {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, done: true } : todo
        )
      );
    } catch (error) {
      console.error("couldnt complete todo:", error);
    }
  };

  //edit
  const editTodo = async (id, newDesc,title,dueDate) => {
    console.log("reached into editTodo",id,newDesc);
    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({description: newDesc,title: title,dueDate: dueDate}),
      });
  
      if (response.ok) {
        console.log("updated successfully");

      } else {
        console.error("failed to update", response.status);
      }
    } catch (error) {

      console.error("error", error);
    }
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Todo App</h1>
      <br />
      <div className="todo-list">
      <div className="add-todo">
        <input
          type="text"
          placeholder="Title"
          value={todo.title || ""}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={todo.description || ""}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <input
          type="date"
          placeholder="Due Date"
          value={todo.dueDate || "No Due Date"}
          onChange={(e) => setTodo({ ...todo, dueDate: e.target.value })}
        />

        <button onClick={addTodo}>Add Todo</button>
      </div>
        {todos.map((todo) => {
          console.log("Todo:", todo);

          return (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
              onComplete={()=>doneTodo(todo.id)}
              onEdit={(id,newDesc,title,dueDate)=>editTodo(id,newDesc,title,dueDate)}
            />
          );
        })}
      </div>

    </div>
  );
}

export default App;
