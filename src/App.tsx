import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import type { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    await deleteTask(id);
    await loadTasks();

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

    toast.success(
      task.isCompleted ? "Task marked incomplete!" : "Task completed!"
    );

    await loadTasks();
  }

  // Open modal for adding task
  function handleAddTask() {
    setEditingTask(null);
    setShowModal(true);
  }

  // Open modal for editing task
  function handleEdit(task: Task) {
    setEditingTask(task);
    setShowModal(true);
  }

  return (
    <>
      <Header />

      <main className="container py-5">
        <Toaster position="top-center" />

        

        {/* FORM MODAL */}
        {showModal && (
          <div className="modal-backdrop-custom">
            <div className="modal-content-custom">
              <TaskForm
                onSubmitTask={handleSubmitTask}
                editingTask={editingTask}
              />

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
        
       
       {/* TASK STATS BAR */}
        <section className="stats-bar mb-5">
          <div className="stats-item">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stats-divider"></div>

          <div className="stats-item">
            <span>Completed</span>
            <strong>{tasks.filter((task) => task.isCompleted).length}</strong>
          </div>

          <div className="stats-divider"></div>

          <div className="stats-item">
            <span>Pending</span>
            <strong>{tasks.filter((task) => !task.isCompleted).length}</strong>
          </div>
        </section>

        {/* TASK SECTION */}
        <section id="tasks">
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onAddTask={handleAddTask}
          />
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="premium-section mt-5">
          <div className="section-heading text-center">
            <span className="section-badge">App Features</span>
            <h2>Built to Help Students Stay Organized</h2>
            <p>
              Manage assignments, deadlines, priorities, and progress with a simple
              study planner.
            </p>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-md-4">
              <div className="premium-card">
                <div className="premium-icon">📝</div>
                <h4>Add & Edit Tasks</h4>
                <p>Create and update study tasks with subjects, dates, and priorities.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="premium-card">
                <div className="premium-icon">✅</div>
                <h4>Track Progress</h4>
                <p>Mark tasks complete or incomplete to stay on top of your work.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="premium-card">
                <div className="premium-icon">☁️</div>
                <h4>Firebase Storage</h4>
                <p>Save tasks using Firebase so your data stays available.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="about-premium-section mt-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="section-badge">About The Project</span>
              <h2>A Modern Productivity App for Students</h2>
              <p>
                Task & Study Planner helps students organize assignments, manage
                deadlines, and track academic progress through a clean and responsive
                interface.
              </p>

              <div className="tech-tags">
                <span>React</span>
                <span>TypeScript</span>
                <span>Firebase</span>
                <span>Bootstrap</span>
                <span>useState</span>
                <span>useEffect</span>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-dark-card">
                <div>
                  <h4>⚡ Fast & Responsive</h4>
                  <p>Works smoothly on desktop, tablet, and mobile screens.</p>
                </div>

                <div>
                  <h4>☁️ Cloud Storage</h4>
                  <p>Firebase keeps task data saved and available.</p>
                </div>

                <div>
                  <h4>🎯 Productivity Focused</h4>
                  <p>Designed to help students manage priorities clearly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}