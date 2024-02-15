import React, { useEffect, useRef, useState } from "react";
import { TodoItem } from "../utilities/model";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import "../styles/allStyles.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todoItem: TodoItem;
  todoList: TodoItem[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  index: number;
}

// type Actions =
//   | {type: "add"; payload: string}
//   | {type: "delete"; payload: number}
//   | {type: "done"; payload: number}

const TodoCard = ({ todoItem, todoList, setTodoList, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false); //*to determine if a todoItem is to be in edit mode
  const [editedTodoItem, setEditedTodoItem] = useState<string>( //*to hold the new edited input string, to then be updated as the new todoItem string
    todoItem.todoItem
  );
  const inputRef = useRef<HTMLInputElement>(null);
  // const [state, dispatch] = useReducer(todoReducer, [])

  // const todoReducer = (state: TodoItem[], action: Actions) => {
  //   switch(action.type) {
  //     case 'add':
  //       return [...state, {id: Date.now(), todoItem: action.payload, isDone: false},]
  //     case 'delete':
  //       return state.filter((todoItem) => todoItem.id !== action.payload)
  //     case 'done':
  //       return state.map((todoItem) => todoItem.id === action.payload ? {...todoItem, isDone: !todoItem.isDone} : todoItem)
  //     default:
  //     return state
  //   }
  // }

  useEffect(() => { //*after render when edit changes, reference the input element and focus into it
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setTodoList(
      todoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isDone: !todoItem.isDone }
          : todoItem
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodoList(
      todoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, todoItem: editedTodoItem }
          : todoItem
      )
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={todoItem.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo-card ${snapshot.isDragging ? 'drag' : ''} `}
          onSubmit={(e) => handleEdit(e, todoItem.id)}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editedTodoItem}
              onChange={(e) => setEditedTodoItem(e.target.value)}
              className="todo-card-edit"
            />
          ) : todoItem.isDone ? (
            <s className="todo-card-text">{todoItem.todoItem}</s>
          ) : (
            <span className="todo-card-text">{todoItem.todoItem}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todoItem.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todoItem.id)}>
              <MdDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todoItem.id)}>
              <FaCheck />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoCard;
