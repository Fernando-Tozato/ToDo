package inac.fernando.aulas.projetos.todo_list.task.mapper

import inac.fernando.aulas.projetos.todo_list.task.Task
import inac.fernando.aulas.projetos.todo_list.task.dto.TaskResponse

fun Task.toResponse(): TaskResponse {
    return TaskResponse(
        id = this.id,
        name = this.name,
        description = this.description,
        status = this.status.ordinal,
        priority = this.priority.ordinal,
        dueDate = this.dueDate?.toString(),
        createdAt = this.createdAt.toString(),
        updatedAt = this.updatedAt.toString()
    )
}