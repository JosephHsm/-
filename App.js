import { useState, useEffect } from "react";
import "./styles.css"; 

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  
  useEffect(() => {
    const savedToDos = localStorage.getItem("toDos");
    if (savedToDos !== null) {
      try {
        setToDos(JSON.parse(savedToDos));
      } catch (error) {
        console.error("localStorage에서 투두리스트를 불러오는 데 실패했습니다:", error);
        localStorage.removeItem("toDos");
      }
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  const onChange = (event) => setToDo(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo.trim() === "") {
      return;
    }
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((currentArray) => [newToDo, ...currentArray]);
    setToDo("");
  };

  const deleteToDo = (id) => {
    setToDos((currentArray) => currentArray.filter((item) => item.id !== id));
  };

  return (
    <div id="app-container">
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => deleteToDo(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
