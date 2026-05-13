// src/components/TaskList.tsx

import type { Task } from "../types/Task";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onAddTask: () => void;
};

export default function TaskList({
  tasks,
  onDelete,
  onToggleComplete,
  onEdit,
  onAddTask,
}: Props) {
  return (
    <section className="py-2">

      {/* ============================================
          📌 HERO BANNER
          ============================================ */}
      <div id="home" className="hero-banner">
        <span className="hero-eyebrow">📘 Task & Study Planner</span>

        <h1>Plan your studies with ease</h1>

        <p>
          Organize assignments, track deadlines, and stay on top
          of your priorities — all in one calm, focused space.
        </p>

        <button className="btn btn-primary hero-add-btn" onClick={onAddTask}>
          + Add New Task
        </button>
      </div>

      {/* ============================================
          📌 TASK CARDS GRID
          ============================================ */}
      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h4>No tasks here yet</h4>
          <p>Add your first study task to get started.</p>
        </div>
      ) : (
        <div className="row g-4">
          {tasks.map((task) => (
            <div className="col-12 col-sm-6 col-lg-4" key={task.id}>
              <TaskCard
                task={task}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
