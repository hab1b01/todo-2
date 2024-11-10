import { useState } from "react";
import "./Home.css";
import axios from "axios";
import { useEffect } from "react";
import { Row } from "../componets/row";
import { useUser } from "../context/useUser";

const BASE_URL = process.env.REACT_APP_BASE_URL;
function Home() {
  const { user } = useUser();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const headers = {
    headers: {
      Authorization: user.token,
    },
  };
  const addTask = async () => {
    const response = await axios.post(
      `${BASE_URL}/create`,
      {
        description: task,
      },
      headers
    );
    setTasks((prevTasks) => [...prevTasks, response.data]);
    setTask("");
  };

  const deleteTask = async (deletedTask) => {
    const withoutRemoved = tasks.filter((item) => item.id !== deletedTask.id);
    setTasks(withoutRemoved);

    try {
      await axios.delete(`${BASE_URL}/delete/${deletedTask.id}`, headers);
    } catch (error) {
      setTasks((prevTasks) => [...prevTasks, deletedTask]);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL, headers);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="container">
      <h3>Todo</h3>
      <form>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTask();
            }
          }}
          type="text"
          placeholder="Add new task"
        />
      </form>
      <ul>
        {tasks.map((item) => (
          <Row key={item.id} item={item} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
}

export default Home;
