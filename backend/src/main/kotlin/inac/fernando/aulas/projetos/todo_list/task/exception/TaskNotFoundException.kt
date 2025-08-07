package inac.fernando.aulas.projetos.todo_list.task.exception

class TaskNotFoundException(id: Long) : RuntimeException("Task with ID $id not found")