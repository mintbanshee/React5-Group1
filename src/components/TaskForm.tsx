// src/components/TaskForm.tsx

import { useEffect, useState } from "react";
import type { Task } from "../types/Task";

import highPriorityImage from "../assets/images/highPriority.jpg";
import mediumPriorityImage from "../assets/images/mediumPriority.jpg";
import lowPriorityImage from "../assets/images/lowPriority.jpg";

type Props = {
  onSubmitTask: (task: Task) => void;
  editingTask: Task | null;
};

// Default empty task for form reset and initialization
const emptyTask: Task = {
  title: "",
  subject: "",
  dueDate: "",
  priority: "Low",
  imageUrl: lowPriorityImage,
  isCompleted: false,
};

export default function TaskForm({ onSubmitTask, editingTask }: Props) {
  const [task, setTask] = useState<Task>(emptyTask);

  // Sync form state with editing task when it changes
  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else {
      setTask(emptyTask);
    }
  }, [editingTask]);

  // Helper to get the correct image based on priority
  function getPriorityImage(priority: Task["priority"]) {
    if (priority === "High") return highPriorityImage;
    if (priority === "Medium") return mediumPriorityImage;
    return lowPriorityImage;
  }

  // Handle input changes for text fields
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setTask({
      ...task,
      [name]: value,
    });
  }

  // Handle priority change and update image accordingly
  function handlePriorityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedPriority = event.target.value as Task["priority"];

    setTask({
      ...task,
      priority: selectedPriority,
      imageUrl: getPriorityImage(selectedPriority),
    });
  }

  // Handle form submission
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onSubmitTask(task);
    setTask(emptyTask);
  }

  return (
    <section className="container py-4">
      <div
        className="card p-4 shadow-sm rounded-3 mx-auto"
        style={{ maxWidth: "650px" }}
      >
        {/*~*~*~*~*~* FORM TITLE DEPENDING ON ADD OR EDIT *~*~*~*~*~*/}
        <h2 className="mb-4 text-center text-dark">
          {editingTask ? "Edit Task" : "Add Task"}
        </h2>

        {/*~*~*~*~*~* FORM FIELDS *~*~*~*~*~*/}
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="title"
            type="text"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="subject"
            type="text"
            placeholder="Subject"
            value={task.subject}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="dueDate"
            type="date"
            value={task.dueDate}
            onChange={handleChange}
            required
          />

          <select
            className="form-control mb-3"
            name="priority"
            value={task.priority}
            onChange={handlePriorityChange}
            required
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          {/*~*~*~*~*~* PRIORITY IMAGE BASED ON SELECTION *~*~*~*~*~*/}
          {task.imageUrl && (
            <img
              src={task.imageUrl}
              alt={`${task.priority} priority`}
              className="img-fluid rounded mb-3 w-100"
              style={{ maxHeight: "150px", objectFit: "cover" }}
            />
          )}

          {/*~*~*~*~*~* SUBMIT BUTTON *~*~*~*~*~*/}
          <button type="submit" className="btn btn-primary w-100">
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </section>
  );
}
