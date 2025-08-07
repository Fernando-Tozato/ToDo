package inac.fernando.aulas.projetos.todo_list.task.dto

import inac.fernando.aulas.projetos.todo_list.task.TaskPriority
import inac.fernando.aulas.projetos.todo_list.task.TaskStatus
import java.time.Instant

data class TaskUpdateRequest(
    val name: String? = null,
    val description: String? = null,
    val status: TaskStatus? = null,
    val priority: TaskPriority? = null,
    val dueDate: Instant? = null
)
