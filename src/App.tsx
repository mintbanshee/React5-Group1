import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import type { Task } from "./types/Task";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";

import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./services/taskService";

// ========================================================
// 📌 Main Application Component
// ========================================================
// This component handles:
// - Firebase data loading
// - Task CRUD operations
// - Modal control
// - Filtering logic
// ========================================================

export default function App() {

  // ========================================================
  // 📌 State Management
  // ========================================================
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"All" | "Today" | "Upcoming" | "Completed">("All");

  // ========================================================
  // 📌 Load Tasks from Firebase
  // ========================================================
  async function loadTasks() {
    const tasksFromFirebase = await getTasks();
    setTasks(tasksFromFirebase);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // ========================================================
  // 📌 Filter Logic (UI Filtering Only)
  // ========================================================
  const filteredTasks = tasks.filter((task) => {
    const today = new Date().toISOString().split("T")[0];

    if (filter === "All") return true;

    if (filter === "Today") {
      return task.dueDate === today;
    }

    if (filter === "Upcoming") {
      return task.dueDate > today && !task.isCompleted;
    }

    if (filter === "Completed") {
      return task.isCompleted;
    }

    return true;
  });

  // ========================================================
  // 📌 Add or Update Task
  // ========================================================
  async function handleSubmitTask(task: Task) {
    if (editingTask?.id) {
      await updateTask(editingTask.id, task);
      toast.success("Task updated!");
    } else {
      await addTask(task);
      toast.success("Task added!");
    }

    await loadTasks();
    setShowModal(false);
    setEditingTask(null);
  }

  // ========================================================
  // 📌 Delete Task
  // ========================================================
  async function handleDelete(id: string) {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    await deleteTask(id);
    await loadTasks();

    // Undo option toast
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

  // ========================================================
  // 📌 Toggle Completion Status
  // ========================================================
  async function handleToggleComplete(task: Task) {
    if (!task.id) return;

    await updateTask(task.id, {
      ...task,
      isCompleted: !task.isCompleted,
    });

    toast.success(
      task.isCompleted ? "Task marked incomplete!" : "Task completed!"
    );

    await loadTasks();
  }

  // ========================================================
  // 📌 Open Add Task Modal
  // ========================================================
  function handleAddTask() {
    setEditingTask(null);
    setShowModal(true);
  }

  // ========================================================
  // 📌 Open Edit Task Modal
  // ========================================================
  function handleEdit(task: Task) {
    setEditingTask(task);
    setShowModal(true);
  }

  return (
    <main className="container py-5">

      {/* ========================================================
          📌 Toast Notifications
      ======================================================== */}
      <Toaster position="top-center" />

      {/* ========================================================
          📌 Filter Component
      ======================================================== */}
      <Filter
        selectedFilter={filter}
        onFilterChange={setFilter}
      />

      {/* ========================================================
          📌 Task Modal (Add / Edit)
      ======================================================== */}
      {showModal && (
        <div className="modal-backdrop-custom">
          <div className="modal-content-custom">

            <TaskForm
              onSubmitTask={handleSubmitTask}
              editingTask={editingTask}
            />

            {/* Cancel Button */}
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

      {/* ========================================================
          📌 Task List (Filtered)
      ======================================================== */}
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