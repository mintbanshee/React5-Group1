// ========================================================
// 📌 IMPORTS
// ========================================================

// React hooks
import { useEffect, useState } from "react";

// Toast notification library
import toast, { Toaster } from "react-hot-toast";

// Main CSS file
import "./App.css";

// Task type interface
import type { Task } from "./types/Task";

// Reusable components
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

// Firebase service functions
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./services/taskService";

// ========================================================
// 📌 MAIN APPLICATION COMPONENT
// ========================================================

export default function App() {

  // ========================================================
  // 📌 STATE MANAGEMENT
  // ========================================================

  // Stores all tasks from Firebase
  const [tasks, setTasks] = useState<Task[]>([]);

  // Stores task currently being edited
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Controls add/edit task modal visibility
  const [showModal, setShowModal] = useState(false);

  // Stores selected filter option
  const [filter, setFilter] = useState<
    "All" | "Today" | "Upcoming" | "Completed"
  >("All");

  // ========================================================
  // 📌 LOAD TASKS FROM FIREBASE
  // ========================================================

  async function loadTasks() {

    // Fetch tasks from Firebase
    const tasksFromFirebase = await getTasks();

    // Update tasks state
    setTasks(tasksFromFirebase);
  }

  // Run once when component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  // ========================================================
  // 📌 FILTER TASKS BASED ON USER SELECTION
  // ========================================================

  const filteredTasks = tasks.filter((task) => {

    // Get today's date
    const today = new Date().toISOString().split("T")[0];

    // Show all tasks
    if (filter === "All") return true;

    // Show today's tasks only
    if (filter === "Today") {
      return task.dueDate === today;
    }

    // Show upcoming incomplete tasks
    if (filter === "Upcoming") {
      return task.dueDate > today && !task.isCompleted;
    }

    // Show completed tasks only
    if (filter === "Completed") {
      return task.isCompleted;
    }

    return true;
  });

  // ========================================================
  // 📌 ADD OR UPDATE TASK
  // ========================================================

  async function handleSubmitTask(task: Task) {

    // Update existing task
    if (editingTask?.id) {

      await updateTask(editingTask.id, task);

      toast.success("Task updated!");

    } else {

      // Add new task
      await addTask(task);

      toast.success("Task added!");
    }

    // Reload updated tasks
    await loadTasks();

    // Close modal and clear edit state
    setShowModal(false);
    setEditingTask(null);
  }

  // ========================================================
  // 📌 DELETE TASK WITH UNDO OPTION
  // ========================================================

  async function handleDelete(id: string) {

    // Find task before deleting
    const taskToDelete = tasks.find((task) => task.id === id);

    if (!taskToDelete) return;

    // Confirmation popup
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    // Delete task from Firebase
    await deleteTask(id);

    // Reload tasks
    await loadTasks();

    // Toast with undo option
    toast((t) => (
      <span>
        Task deleted!

        <button
          className="btn btn-sm btn-outline-primary ms-3"
          onClick={async () => {

            // Remove old id before restoring
            const { id, ...taskWithoutId } = taskToDelete;

            // Restore task
            await addTask(taskWithoutId as Task);

            // Reload tasks
            await loadTasks();

            // Close current toast
            toast.dismiss(t.id);

            // Success message
            toast.success("Task restored!");
          }}
        >
          Undo
        </button>
      </span>
    ));
  }

  // ========================================================
  // 📌 TOGGLE TASK COMPLETION STATUS
  // ========================================================

  async function handleToggleComplete(task: Task) {

    // Prevent update if task id is missing
    if (!task.id) return;

    // Toggle completed status
    await updateTask(task.id, {
      ...task,
      isCompleted: !task.isCompleted,
    });

    // Success toast notification
    toast.success(
      task.isCompleted
        ? "Task marked incomplete!"
        : "Task completed!"
    );

    // Reload tasks
    await loadTasks();
  }

  // ========================================================
  // 📌 OPEN ADD TASK MODAL
  // ========================================================

  function handleAddTask() {

    // Clear editing task
    setEditingTask(null);

    // Open modal
    setShowModal(true);
  }

  // ========================================================
  // 📌 OPEN EDIT TASK MODAL
  // ========================================================

  function handleEdit(task: Task) {

    // Store selected task
    setEditingTask(task);

    // Open modal
    setShowModal(true);
  }

  // ========================================================
  // 📌 JSX UI
  // ========================================================

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Main Container */}
      <main className="container py-5">

        {/* Toast Notifications */}
        <Toaster position="top-center" />

        {/* ========================================================
            📌 FILTER COMPONENT
        ======================================================== */}
        <Filter
          selectedFilter={filter}
          onFilterChange={setFilter}
        />

        {/* ========================================================
            📌 ADD / EDIT TASK MODAL
        ======================================================== */}
        {showModal && (
          <div className="modal-backdrop-custom">

            <div className="modal-content-custom">

              {/* Task Form */}
              <TaskForm
                onSubmitTask={handleSubmitTask}
                editingTask={editingTask}
              />

              {/* Cancel Button */}
              <button
                className="btn btn-outline-secondary w-100 mt-3"
                onClick={() => {

                  // Close modal
                  setShowModal(false);

                  // Clear editing state
                  setEditingTask(null);
                }}
              >
                Cancel
              </button>

            </div>
          </div>
        )}

        {/* ========================================================
            📌 TASK STATISTICS BAR
        ======================================================== */}
        <section className="stats-bar mb-5">

          {/* Total Tasks */}
          <div className="stats-item">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stats-divider"></div>

          {/* Completed Tasks */}
          <div className="stats-item">
            <span>Completed</span>

            <strong>
              {tasks.filter((task) => task.isCompleted).length}
            </strong>
          </div>

          <div className="stats-divider"></div>

          {/* Pending Tasks */}
          <div className="stats-item">
            <span>Pending</span>

            <strong>
              {tasks.filter((task) => !task.isCompleted).length}
            </strong>
          </div>
        </section>

        {/* ========================================================
            📌 TASK LIST SECTION
        ======================================================== */}
        <section id="tasks">

          <TaskList
            tasks={filteredTasks}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onAddTask={handleAddTask}
          />

        </section>

        {/* ========================================================
            📌 FEATURES SECTION
        ======================================================== */}
        <section id="features" className="premium-section mt-5">

          <div className="section-heading text-center">

            <span className="section-badge">
              App Features
            </span>

            <h2>Built to Help Students Stay Organized</h2>

            <p>
              Manage assignments, deadlines, priorities,
              and progress with a simple study planner.
            </p>

          </div>

          <div className="row g-4 mt-4">

            {/* Feature Card 1 */}
            <div className="col-md-4">
              <div className="premium-card">

                <div className="premium-icon">📝</div>

                <h4>Add & Edit Tasks</h4>

                <p>
                  Create and update study tasks with subjects,
                  dates, and priorities.
                </p>

              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="col-md-4">
              <div className="premium-card">

                <div className="premium-icon">✅</div>

                <h4>Track Progress</h4>

                <p>
                  Mark tasks complete or incomplete to stay
                  on top of your work.
                </p>

              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="col-md-4">
              <div className="premium-card">

                <div className="premium-icon">☁️</div>

                <h4>Firebase Storage</h4>

                <p>
                  Save tasks using Firebase so your data
                  stays available.
                </p>

              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            📌 ABOUT SECTION
        ======================================================== */}
        <section id="about" className="about-premium-section mt-5">

          <div className="row align-items-center g-5">

            {/* About Text */}
            <div className="col-lg-6">

              <span className="section-badge">
                About The Project
              </span>

              <h2>A Modern Productivity App for Students</h2>

              <p>
                Task & Study Planner helps students organize
                assignments, manage deadlines, and track
                academic progress through a clean and
                responsive interface.
              </p>

              {/* Technology Tags */}
              <div className="tech-tags">

                <span>React</span>
                <span>TypeScript</span>
                <span>Firebase</span>
                <span>Bootstrap</span>
                <span>useState</span>
                <span>useEffect</span>

              </div>
            </div>

            {/* Right Side Info Card */}
            <div className="col-lg-6">

              <div className="about-dark-card">

                <div>
                  <h4>⚡ Fast & Responsive</h4>

                  <p>
                    Works smoothly on desktop, tablet,
                    and mobile screens.
                  </p>
                </div>

                <div>
                  <h4>☁️ Cloud Storage</h4>

                  <p>
                    Firebase keeps task data saved
                    and available.
                  </p>
                </div>

                <div>
                  <h4>🎯 Productivity Focused</h4>

                  <p>
                    Designed to help students manage
                    priorities clearly.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

      </main>

       {/* Floating "Back to Top" button */}
      <BackToTop />

      {/* Footer Component */}
      <Footer />
    </>
  );
}