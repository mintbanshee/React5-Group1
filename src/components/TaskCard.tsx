// src/components/TaskCard.tsx

import type { Task } from "../types/Task";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
};

export default function TaskCard({ task, onDelete, onToggleComplete, onEdit }: Props) {
  return (
      <div className="card h-100 shadow-sm rounded-2">
        
        {/*~*~*~*~*~* PRIORITY IMAGE *~*~*~*~*~*/}
        <img
          src={task.imageUrl}
          className="card-img-top"
          alt={task.priority}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400?text=Task";
          }}
        />

        {/*~*~*~*~*~* TOGGLE COMPLETED *~*~*~*~*~*/}
        <div className={`card-body ${task.isCompleted ? "opacity-50" : ""}`}>
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={task.isCompleted}
              onChange={() => onToggleComplete(task)}
            />
            <h5
              className={`card-title ${task.isCompleted ? "text-decoration-line-through text-muted" : ""}`}
            >
              {task.title}
            </h5>
          </div>

          {/*~*~*~*~*~* CARD FOOTER WITH BUTTONS *~*~*~*~*~*/}
          <div
            className={`card-footer bg-white ${task.isCompleted ? "opacity-50" : ""}`}
          >
            {task.id && (
              <>
                <button
                  className="btn btn-outline-primary w-100 mb-2"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => onDelete(task.id!)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
  );
}
