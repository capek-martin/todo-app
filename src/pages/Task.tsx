import { Checkbox, Typography } from "@mui/material";
import { Status, Task } from "../types/Task.types";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  task: Task;
  onStatusChange: (id: string, newStatus: Status) => void;
  onRemove: (id: string) => void;
}

export const TaskComponent = ({ task, onStatusChange, onRemove }: Props) => {
  return (
    <div key={task.id} className="task-container">
      <div
        className={`task ${task.status}`}
        onClick={() =>
          task.status === Status.CREATED
            ? onStatusChange(task.id, Status.FINISHED)
            : onStatusChange(task.id, Status.CREATED)
        }
      >
        <Checkbox checked={task.status === Status.FINISHED} />
        <Typography variant={"body1"}>{task.text}</Typography>
      </div>
      <ClearIcon
        onClick={() => {
          onRemove(task.id);
        }}
      />
    </div>
  );
};
