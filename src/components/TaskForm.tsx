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

  // Map priority to CSS class for preview
  function getPriorityClass(priority: Task["priority"]) {
    if (priority === "High") return "priority-high";
    if (priority === "Medium") return "priority-medium";
    return "priority-low";
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
    <div className="task-form-wrap">

      {/* Form title */}
      <h2>{editingTask ? "Edit Task" : "Add a new task"}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>

        {/* Title */}
        <label className="form-label-soft">Task Title</label>
        <input
          className="form-control mb-3"
          name="title"
          type="text"
          placeholder="e.g. Finish React assignment"
          value={task.title}
          onChange={handleChange}
          required
        />

        {/* Subject */}
        <label className="form-label-soft">Subject</label>
        <input
          className="form-control mb-3"
          name="subject"
          type="text"
          placeholder="e.g. Web Development"
          value={task.subject}
          onChange={handleChange}
          required
        />

        {/* Due date */}
        <label className="form-label-soft">Due Date</label>
        <input
          className="form-control mb-3"
          name="dueDate"
          type="date"
          value={task.dueDate}
          onChange={handleChange}
          required
        />

        {/* Priority */}
        <label className="form-label-soft">Priority</label>
        <select
          className="form-select mb-1"
          name="priority"
          value={task.priority}
          onChange={handlePriorityChange}
          required
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        {/* Priority gradient preview */}
        <div className={`priority-preview ${getPriorityClass(task.priority)}`}>
          <span>{task.priority} Priority</span>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-100">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}
