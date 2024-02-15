import { useRef } from "react";
import "../styles/allStyles.css";

interface Props {
  todoItem: string;
  setTodoItem: React.Dispatch<React.SetStateAction<string>>; //*type of the set function from useState
  handleAdd: (e: React.FormEvent) => void; //*define type of function by type of return
}

const InputField = ({ todoItem, setTodoItem, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null); //*used to reference/modify html elements

  return (
    <form
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur(); //*modify the element with current property to access other methods to affect the html element that was linked
      }}
      className="input"
    >
      <input
        ref={inputRef} //*useRef is linked to this input element
        type="input"
        placeholder="Enter a task"
        className="input-box"
        value={todoItem}
        onChange={(e) => setTodoItem(e.target.value)}
      />
      <button className="input-button" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
