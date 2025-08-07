package inac.fernando.aulas.projetos.todo_list.task.dto

data class TaskResponse(
    val id: Long?,
    val name: String,
    val description: String?,
    val status: Int,
    val priority: Int,
    val dueDate: String?,  // ISO string
    val createdAt: String, // ISO string
    val updatedAt: String  // ISO string
)
