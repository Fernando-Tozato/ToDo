import { TaskStatus } from "./TaskStatus.ts";

export default interface TaskForm {
	name: string;
	description:  (string | null);
	status: TaskStatus;
	priority: number;
	dueDate: string;
}