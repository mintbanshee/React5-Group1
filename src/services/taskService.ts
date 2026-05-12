// src/services/taskService.ts

import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import type { Task } from "../types/Task";

const tasksCollection = collection(db, "tasks");

// add a new task to firebase
export async function addTask(task: Task) {
  return await addDoc(tasksCollection, task);
}

// get all tasks from firebase to display in the UI
export async function getTasks(): Promise<Task[]> {
  const snapshot = await getDocs(tasksCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[];
}

// get a specific task by ID
export async function getTaskById(id: string): Promise<Task | null> {
  const taskDoc = doc(db, "tasks", id);
  const snapshot = await getDoc(taskDoc);
 
  if (!snapshot.exists()) return null;
 
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Task;
}

// edit a task and update it in firebase
export async function updateTask(id: string, task: Task) {
  const taskDoc = doc(db, "tasks", id);
 
  return await updateDoc(taskDoc, {
    title: task.title,
    subject: task.subject,
    dueDate: task.dueDate,
    priority: task.priority,
    imageUrl: task.imageUrl,
    isCompleted: task.isCompleted,
  });
}
 
// delete a task
export async function deleteTask(id: string) {
  const taskDoc = doc(db, "tasks", id);
  return await deleteDoc(taskDoc);
}