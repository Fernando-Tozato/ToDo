package inac.fernando.aulas.projetos.todo_list.task

import inac.fernando.aulas.projetos.todo_list.task.dto.TaskCreateRequest
import inac.fernando.aulas.projetos.todo_list.task.dto.TaskResponse
import inac.fernando.aulas.projetos.todo_list.task.dto.TaskUpdateRequest
import inac.fernando.aulas.projetos.todo_list.task.mapper.toResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("api/tasks")
class TaskController(
    private val taskService: TaskService
) {

    @GetMapping()
    fun getAllTasks(): ResponseEntity<List<TaskResponse>> {
        val tasks = taskService.getAllTasks()
        val taskResponses = tasks.map { it.toResponse() }
        return ResponseEntity.ok(taskResponses)
    }

    @GetMapping("/{id}")
    fun getTaskById(@PathVariable id: Long): ResponseEntity<TaskResponse> {
        val task = taskService.getTaskById(id)
        val response = task.toResponse()
        return ResponseEntity.ok(response)
    }

    @PostMapping()
    fun createTask(@RequestBody task: TaskCreateRequest): ResponseEntity<TaskResponse> {
        val createdTask = taskService.createTask(task)
        val response = createdTask.toResponse()
        return ResponseEntity.status(201).body(response)
    }

    @PatchMapping("/{id}")
    fun updateTask(@PathVariable id: Long, @RequestBody task: TaskUpdateRequest): ResponseEntity<TaskResponse> {
        val updatedTask = taskService.updateTask(id, task)
        return ResponseEntity.ok(updatedTask.toResponse())
    }

    @DeleteMapping("/{id}")
    fun deleteTask(@PathVariable id: Long): ResponseEntity<Void> {
        taskService.deleteTask(id)
        return ResponseEntity.noContent().build()
    }
}