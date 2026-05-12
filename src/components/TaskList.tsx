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
  const hasCompleted = tasks.some((task) => task.isCompleted);

  return (
    <section className="container py-4">

    {/*~*~*~*~*~* TOP BANNER *~*~*~*~*~*/}
      <div className="p-5 mb-4 bg-success rounded-3 text-center shadow-sm">
        <h1 className="mb-4 text-dark">Your Study Planner</h1>
        <p className="lead mb-4">
          A little organization today makes tomorrow feel lighter.
        </p>

      {/*~*~*~*~*~* ADD TASK BUTTON *~*~*~*~*~*/}
        <div className="d-flex justify-content-center mb-4">
          <button className="btn btn-primary" onClick={onAddTask}>
            Add Task
          </button>
        </div>
      </div>

      {/*~*~*~*~*~* TASK CARDS *~*~*~*~*~*/}
      {tasks.length === 0 ? (
        <p className="text-center text-muted">No tasks added yet.</p>
      ) : (
        <div className="row g-4">
          {tasks.map((task) => (
            <div className="col-md-4" key={task.id}>
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
