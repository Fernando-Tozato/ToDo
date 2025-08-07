package inac.fernando.aulas.projetos.todo_list.task.dto

import inac.fernando.aulas.projetos.todo_list.task.TaskPriority
import inac.fernando.aulas.projetos.todo_list.task.TaskStatus

data class TaskCreateRequest(
    val name: String,
    val description: String? = null,
    val status: TaskStatus = TaskStatus.TODO,
    val priority: TaskPriority = TaskPriority.MEDIUM,
    val dueDate: String? = null
)
