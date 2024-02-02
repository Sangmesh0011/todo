import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import "./todo.css";

const Todo = ({ todo, onDelete, onComplete, onEdit }) => {
  //deconstruct the todo we obtain from db set by use state
  const { id, title, description, dueDate, done } = todo;
  

  const [newDesc,setNewDesc]=useState(description);
  
  console.log("new title in compnent",newDesc);
  //return a todo with the data
  return (
    <div className="todo-item">
      <div className="title">{title}</div>
      <div className="desc"><p><input type="text" value={newDesc} onChange={(e) => {setNewDesc(e.target.value)}}/></p></div>
      <div className="info">
        <div className="date"><p>{dueDate}</p></div>
        <div className="status"><p>{done ? "Done" : "Pending"}</p></div>
      </div>
      <div className="buttons">
        <div className="button1" onClick={() => onDelete(id)}>
          <MdDeleteForever className="icons"/>
        </div>
        <div className="button2" onClick={()=>onComplete(id)}>
          <TiTick className="icons"/>
        </div>
        <div className="button3" onClick={onEdit(id,newDesc,title,dueDate)}>
          
        </div>
      </div>
    </div>
  );
};

export default Todo;

