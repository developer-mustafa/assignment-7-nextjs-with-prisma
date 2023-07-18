import { useState, useEffect } from "react";
import { HiPencilAlt, HiTrash, HiCheck, HiX } from "react-icons/hi";
import { BsCircleFill } from "react-icons/bs";

function TodoListApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");
  const [isEnglish, setIsEnglish] = useState(true);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTasks = [
        ...tasks,
        { text: newTask, editing: false, completed: false },
      ];
      setTasks(newTasks);
      setNewTask("");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const startEditingTask = (index, text) => {
    setEditingTaskIndex(index);
    setEditingTaskText(text);
  };

  const cancelEditingTask = () => {
    setEditingTaskIndex(null);
    setEditingTaskText("");
  };

  const updateTask = (index, text) => {
    if (text.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = text;
      updatedTasks[index].editing = false;
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
      setEditingTaskText("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="container max-w-lg p-8 bg-gray-800 rounded shadow-lg">
        <h1 className="text-3xl md:text-5xl mb-4 text-center text-amber-500 font-bold">
          {isEnglish ? "Todo List App" : "টুডো লিস্ট অ্যাপ"}
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <textarea
            placeholder={isEnglish ? "Type here..." : "এখানে লিখুন..."}
            className="border p-2 mb-4 bg-gray-800 flex-grow md:mr-2 rounded text-white text-2xl"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded mt-4 md:mt-0 mb-3"
            onClick={addTask}
          >
            {isEnglish ? "Add Task" : "টাস্ক যুক্ত করুন"}
          </button>
        </div>
        <ul className="w-full">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex items-center justify-between border-b-2 rounded p-4 text-white text-2xl ${
                task.completed ? "bg-gray-700" : "bg-gray-800"
              } mb-2 hover:bg-gray-700 transition-colors duration-300`}
            >
              {editingTaskIndex === index ? (
                <div className="flex-grow">
                  <input
                    className="border p-2 bg-gray-800 w-full rounded text-white text-lg focus:outline-none"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                  />
                  <div className="flex items-center justify-end mt-2">
                    <button
                      className="text-green-500 hover:text-green-600 mr-2"
                      onClick={() => updateTask(index, editingTaskText)}
                    >
                      <HiCheck className="h-10  w-10" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={cancelEditingTask}
                    >
                      <HiX className="h-10  w-10" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-grow">
                  <span
                    className={`text-xl md:text-2xl font-medium ${
                      task.completed
                        ? "line-through font-bold text-green-400"
                        : ""
                    }`}
                  >
                    {index + 1}. {task.text}
                  </span>
                  <div className="flex items-center justify-end mt-2">
                    {task.completed ? (
                      <button
                        className="text-green-500 hover:text-green-600 mr-2"
                        onClick={() => toggleTaskCompletion(index)}
                      >
                        <HiCheck className="h-10  w-10" />
                      </button>
                    ) : (
                      <button
                        className="text-gray-300 hover:text-gray-400 mr-2"
                        onClick={() => toggleTaskCompletion(index)}
                      >
                        <BsCircleFill className="h-10  w-10" />
                      </button>
                    )}
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={() => startEditingTask(index, task.text)}
                    >
                      <HiPencilAlt className="h-10  w-10" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 ml-2"
                      onClick={() => deleteTask(index)}
                    >
                      <HiTrash className="h-10  w-10" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        {showNotification && (
          <div className="text-green-500 mt-4 text-center">
            {isEnglish ? "Task Added!" : "টাস্ক যুক্ত হয়েছে!"}
          </div>
        )}
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          className="text-white h-10 w-10 flex items-center justify-center rounded-full bg-gray-800"
          onClick={toggleLanguage}
        >
          {isEnglish ? (
            <span role="img" aria-label="Switch to Bengali">
              🇧🇩
            </span>
          ) : (
            <span role="img" aria-label="Switch to English">
              🇺🇸
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default TodoListApp;
