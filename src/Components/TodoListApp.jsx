import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { HiPencilAlt, HiTrash } from "react-icons/hi";

function TodoListApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

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
      setTasks([...tasks, { text: newTask, editing: false }]);
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

  const startEditingTask = (index) => {
    setEditingTaskIndex(index);
    setEditingTaskText(tasks[index].text);
  };

  const cancelEditingTask = () => {
    setEditingTaskIndex(null);
    setEditingTaskText("");
  };

  const updateTask = (index) => {
    if (editingTaskText.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = editingTaskText;
      updatedTasks[index].editing = false;
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
      setEditingTaskText("");
    }
  };

  const getRandomColor = () => {
    const colors = ["bg-gray-700"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="container max-w-lg p-8 bg-gray-800 rounded shadow-lg">
        <h1 className="text-3xl md:text-5xl mb-4 text-center">Todo List</h1>
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <textarea
            className="border p-2 mb-4 bg-gray-800 flex-grow md:mr-2 rounded text-white text-2xl"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0 mb-3"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <ul className="w-full">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex items-center justify-between border-b-4 rounded p-4 t ${getRandomColor()} mb-2`}
            >
              {editingTaskIndex === index ? (
                <input
                  className="border p-2 bg-gray-800 flex-grow mr-2 text-white"
                  value={editingTaskText}
                  onChange={(e) => setEditingTaskText(e.target.value)}
                />
              ) : (
                <span className="text-2xl">{task.text}</span>
              )}
              <div className="flex items-center">
                {editingTaskIndex === index ? (
                  <>
                    <button
                      className="text-green-500 hover:text-green-600 mr-2"
                      onClick={() => updateTask(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={cancelEditingTask}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-yellow-500 hover:text-yellow-600 mr-2"
                      onClick={() => startEditingTask(index)}
                    >
                      <HiPencilAlt className="h-10 w-10" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => deleteTask(index)}
                    >
                      <HiTrash className="h-10 w-10" />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        {showNotification && (
          <Transition
            show={showNotification}
            enter="transition ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {(ref) => (
              <div ref={ref} className="text-green-500 mt-4 text-center">
                Task Added!
              </div>
            )}
          </Transition>
        )}
      </div>
    </div>
  );
}

export default TodoListApp;
