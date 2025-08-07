package inac.fernando.aulas.projetos.todo_list.task.mapper

import inac.fernando.aulas.projetos.todo_list.task.Task
import inac.fernando.aulas.projetos.todo_list.task.dto.TaskCreateRequest
import java.time.Instant

fun TaskCreateRequest.toEntity(): Task {
    val dueDate: Instant? =
        if (this.dueDate != null) {
            Instant.parse(this.dueDate) // Validate the date format
        } else {
            null
        }

    return Task(
        name = this.name,
        description = this.description,
        status = this.status,
        priority = this.priority,
        dueDate = dueDate
    )
}