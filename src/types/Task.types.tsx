export const enum Status {
  CREATED = "created",
  FINISHED = "finished",
  PAST_DEADLINE = "pastDeadline",
}

export interface Task {
  id: string;
  text: string;
  status: Status;
  created: Date;
  // deadline?: Date;
  // priority
}
