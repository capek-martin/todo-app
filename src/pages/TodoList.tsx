import { useEffect, useState } from "react";
import { Status, Task } from "../types/Task.types";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import "firebase/firestore";
import { db } from "../main";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { TaskComponent } from "./Task";

export const TodoList = () => {
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  /**
   * Fetch tasks from firestore db
   */
  const fetchTasks = async () => {
    const collectionRef = collection(db, "tasks");
    try {
      let tasks: Task[] = [];
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc) => {
        tasks = [...tasks, { id: doc.id, ...doc.data() } as Task];
      });
      setTasks(tasks);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  /**
   * Add new task
   */
  const handleAddTask = async () => {
    if (text === "") return;
    try {
      await addDoc(collection(db, "tasks"), {
        status: "created",
        text: text,
      });
      toast.success("Task added");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // reset form
    setText("");
    fetchTasks();
  };

  /**
   * Remove task
   * @param id
   */
  const handleRemove = async (id: string) => {
    try {
      const docRef = doc(db, "tasks", id);
      await deleteDoc(docRef);
      fetchTasks();
      toast.success("Task removed");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  /**
   * Change status of selected task
   * @param id
   * @param newStatus
   */
  const handleChangeStatus = async (id: string, newStatus: Status) => {
    try {
      const docRef = doc(db, "tasks", id);
      await updateDoc(docRef, { status: newStatus });
      fetchTasks();
      toast.success("Status updated");
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createdTasks = tasks.filter((task) => task.status === Status.CREATED);
  const finishedTasks = tasks.filter((task) => task.status === Status.FINISHED);

  return (
    <div className="container">
      <h1>TODO list</h1>
      <div className="add-form">
        <TextField
          fullWidth
          className="input-todo"
          size="small"
          label="New TODO"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
        />
        <AddIcon onClick={handleAddTask} />
      </div>

      {tasks.length > 0 && (
        <div className="tasks">
          {tasks.length > 0 && createdTasks.length === 0 && (
            <>All tasks done...Good job!</>
          )}
          {createdTasks.map((task: Task) => (
            <TaskComponent
              key={task.id}
              task={task}
              onStatusChange={handleChangeStatus}
              onRemove={handleRemove}
            />
          ))}
          {finishedTasks.length > 0 && <hr />}
          {finishedTasks.map((task: Task) => (
            <TaskComponent
              key={task.id}
              task={task}
              onStatusChange={handleChangeStatus}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
      {tasks.length === 0 && <div className="no-tasks">No more tasks</div>}
    </div>
  );
};
