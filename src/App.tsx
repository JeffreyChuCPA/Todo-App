import { useState } from "react";
import InputField from "./components/InputField";
import "./styles/App.css";
import { TodoItem } from "./utilities/model";
import TodoContainer from "./components/TodoContainer";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const App: React.FC = () => {
	const [todoItem, setTodoItem] = useState<string>(""); //*holds input text 
	const [todoList, setTodoList] = useState<TodoItem[]>([]); //*holds array of todoItem (object with id, todoItem text, isDone boolean)
	const [completedTodoList, setCompletedTodoList] = useState<TodoItem[]>([]); //*holds array of todoItem (object with id, todoItem text, isDone boolean) that is to be in the "completed" UI section

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (todoItem) {
			setTodoList([
				...todoList,
				{ id: Date.now(), todoItem, isDone: false }
			]);
			setTodoItem(""); //*to clear input in input field
		}
	};

	const onDragEnd = (result: DropResult) => {
		const {source, destination} = result;
		console.log(result);
		
		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) return

		let add;
		const active = todoList;
		const complete = completedTodoList;

		if (source.droppableId === "TodosList") {
			add = active[source.index];
			active.splice(source.index, 1)
		} else {
			add = complete[source.index];
			complete.splice(source.index, 1)
		}

		if (destination.droppableId === "TodosList") {
			active.splice(destination.index, 0, add)
		} else {
			complete.splice(destination.index, 0, add)
		}
		setCompletedTodoList(complete)
		setTodoList(active)
	}


	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<div className="App">
					<span className="heading">Taskify</span>
					<InputField
						handleAdd={handleAdd}
						todoItem={todoItem}
						setTodoItem={setTodoItem}
					/>
					<TodoContainer
						todoList={todoList}
						setTodoList={setTodoList}
						completedTodoList={completedTodoList}
						setCompletedTodoList={setCompletedTodoList}
					/>
				</div>
			</DragDropContext>
		</>
	);
};

export default App;
