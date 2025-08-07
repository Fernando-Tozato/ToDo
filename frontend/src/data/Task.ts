import { TaskStatus } from "./TaskStatus.ts";
import type { TaskPriority } from "./TaskPriority.ts";

export default interface Task {
	id: bigint,
	name: string,
	description: (string | null),
	status: TaskStatus,
	priority: TaskPriority,
	dueDate: Date,
	createdAt: Date,
	updatedAt: Date
}