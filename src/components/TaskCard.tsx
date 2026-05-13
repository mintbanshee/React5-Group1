// src/components/TaskCard.tsx

import type { Task } from "../types/Task";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
};

// Helper to format the due date in a friendly way
function formatDueDate(dueDate: string): string {
  if (!dueDate) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate + "T00:00:00");
  const diffMs = due.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  if (diffDays === -1) return "Overdue by 1 day";
  if (diffDays < -1) return `Overdue by ${Math.abs(diffDays)} days`;
  if (diffDays > 1 && diffDays <= 7) return `Due in ${diffDays} days`;

  // Fall back to formatted date for further dates
  return due.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: due.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
  });
}

export default function TaskCard({
  task,
  onDelete,
  onToggleComplete,
  onEdit,
}: Props) {
  // Map priority to CSS modifier
  const priorityClass =
    task.priority === "High"
      ? "priority-high"
      : task.priority === "Medium"
        ? "priority-medium"
        : "priority-low";

  return (
    <div className={`task-card ${task.isCompleted ? "is-completed" : ""}`}>

      {/* Priority header strip with badge */}
      <div className={`task-card-header ${priorityClass}`}>
        <span className={`priority-badge ${priorityClass}`}>
          <span className="badge-dot"></span>
          {task.priority} Priority
        </span>
      </div>

      {/* Card body */}
      <div className="task-card-body">

        {/* Title row with completion toggle */}
        <div className="task-card-top">
          <h5 className="task-card-title">{task.title}</h5>

          <div className="form-check form-switch task-card-toggle">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={task.isCompleted}
              onChange={() => onToggleComplete(task)}
              aria-label="Toggle task completion"
            />
          </div>
        </div>

        {/* Subject + Due date meta */}
        <div className="task-card-meta">
          <div className="task-meta-row">
            <span className="meta-icon">📚</span>
            <span className="task-subject-tag">{task.subject}</span>
          </div>

          {task.dueDate && (
            <div className="task-meta-row">
              <span className="meta-icon">📅</span>
              <span>{formatDueDate(task.dueDate)}</span>
            </div>
          )}
        </div>

        {/* Edit / Delete actions */}
        {task.id && (
          <div className="task-card-actions">
            <button
              className="btn btn-outline-primary"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() => onDelete(task.id!)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
