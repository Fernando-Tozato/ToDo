package inac.fernando.aulas.projetos.todo_list.task

import inac.fernando.aulas.projetos.todo_list.task.dto.TaskCreateRequest
import inac.fernando.aulas.projetos.todo_list.task.dto.TaskUpdateRequest
import inac.fernando.aulas.projetos.todo_list.task.exception.TaskNotFoundException
import inac.fernando.aulas.projetos.todo_list.task.mapper.toEntity
import jakarta.transaction.Transactional
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.time.Instant

@Service
class TaskService(
    private val taskRepository: TaskRepository
) {

    fun getAllTasks(): List<Task> {
        return taskRepository.findAll()
    }

    fun getTaskById(id: Long): Task {
        return taskRepository.findById(id)
            .orElseThrow {
                ResponseStatusException(HttpStatus.NOT_FOUND, "Task with ID $id not found")
            }
    }

    fun createTask(task: TaskCreateRequest): Task {
        return taskRepository.save(task.toEntity())
    }

    fun updateTask(id: Long, update: TaskUpdateRequest): Task {
        val task = taskRepository.findById(id)
            .orElseThrow { TaskNotFoundException(id) }

        task.applyUpdates(update)

        task.updatedAt = Instant.now()

        return taskRepository.save(task)
    }

    @Transactional
    fun deleteTask(id: Long) {
        val task = taskRepository.findById(id)
            .orElseThrow { TaskNotFoundException(id) }
        taskRepository.delete(task)
    }

    fun Task.applyUpdates(update: TaskUpdateRequest) {
        update.name?.let { this.name = it }
        update.description?.let { this.description = it }
        update.status?.let { this.status = it }
        update.priority?.let { this.priority = it }
        update.dueDate?.let { this.dueDate = it }
    }
}