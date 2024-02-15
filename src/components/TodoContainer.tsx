import { Droppable } from "react-beautiful-dnd";
import "../styles/allStyles.css";
import { TodoItem } from "../utilities/model";
import TodoCard from "./TodoCard";

interface Props {
  todoList: TodoItem[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  completedTodoList: TodoItem[];
  setCompletedTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const TodoContainer: React.FC<Props> = ({
  todoList,
  setTodoList,
  completedTodoList,
  setCompletedTodoList
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div className={`todo-container ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todo-heading">Active Tasks</span>
            {todoList.map((item, index) => (
              <TodoCard
								index={index}
                todoItem={item}
                key={item.id}
                todoList={todoList}
                setTodoList={setTodoList}
              />
            ))}
						{provided.placeholder}
          </div>
        )}
      </Droppable>
			<Droppable droppableId="TodoListRemove">
				{(provided, snapshot) => (
					<div className={`todo-container remove ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps} >
					<span className="todo-heading">Completed Tasks</span>
					{completedTodoList.map((item, index) => (
						<TodoCard
							index={index}
							todoItem={item}
							key={item.id}
							todoList={completedTodoList}
							setTodoList={setCompletedTodoList}
						/>
					))}
					{provided.placeholder}

				</div>
				)}
			</Droppable>
      
    </div>
  );
};

export default TodoContainer;
