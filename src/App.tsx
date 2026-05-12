import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import type { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./services/taskService";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Load tasks from Firebase on component mount
  async function loadTasks() {
    const tasksFromFirebase = await getTasks();
    setTasks(tasksFromFirebase);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // Handle adding or updating a task
  async function handleSubmitTask(task: Task) {
    if (editingTask && editingTask.id) {
      await updateTask(editingTask.id, task);
      toast.success("Task updated!");
      setEditingTask(null);
    } else {
      await addTask(task);
      toast.success("Task added!");
    }

    await loadTasks();
    setShowModal(false);
    setEditingTask(null);
  }

  // Handle deleting a task with confirmation and undo option
  async function handleDelete(id: string) {
    const taskToDelete = tasks.find((task) => task.id === id);

    if (!taskToDelete) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    await deleteTask(id);
    await loadTasks();

    // Show toast with undo option
    toast((t) => (
      <span>
        Task deleted!
        <button
          className="btn btn-sm btn-outline-primary ms-3"
          onClick={async () => {
            const { id, ...taskWithoutId } = taskToDelete;

            await addTask(taskWithoutId as Task);
            await loadTasks();
            toast.dismiss(t.id);
            toast.success("Task restored!");
          }}
        >
          Undo
        </button>
      </span>
    ));
  }

  // Handle toggling task completion status
  async function handleToggleComplete(task: Task) {
    if (!task.id) return;

    await updateTask(task.id, {
      ...task,
      isCompleted: !task.isCompleted,
    });

    // Show toast based on new completion status
    toast.success(
      task.isCompleted ? "Task marked incomplete!" : "Task completed!",
    );

    await loadTasks();
  }

  // Handle showing the modal for adding a new task
  function handleAddTask() {
    setEditingTask(null);
    setShowModal(true);
  }

  // Handle showing the modal for editing an existing task
  function handleEdit(task: Task) {
    setEditingTask(task);
    setShowModal(true);
  }

  return (
    <main className="container py-5">
      {/*~*~*~*~*~* TOASTER *~*~*~*~*~*/}
      <Toaster position="top-center" />

      {/*~*~*~*~*~* FORM MODAL *~*~*~*~*~*/}
      {showModal && (
        <div className="modal-backdrop-custom">
          <div className="modal-content-custom">
            <TaskForm
              onSubmitTask={handleSubmitTask}
              editingTask={editingTask}
            />

      {/*~*~*~*~*~* CANCEL BUTTON *~*~*~*~*~*/}
            <button
              className="btn btn-outline-secondary w-100 mt-3"
              onClick={() => {
                setShowModal(false);
                setEditingTask(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    {/*~*~*~*~*~* TASK LIST *~*~*~*~*~*/}
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEdit}
        onAddTask={handleAddTask}
      />
    </main>
  );
}
