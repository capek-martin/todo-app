import "./App.scss";
import { TodoList } from "./pages/TodoList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const App = () => {
  return (
    <>
      <ToastContainer />
      <TodoList />
    </>
  );
};
