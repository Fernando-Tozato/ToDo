package inac.fernando.aulas.projetos.todo_list.task

import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant

enum class TaskStatus {
    TODO,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED
}

enum class TaskPriority {
    HIGHEST,
    HIGH,
    MEDIUM,
    LOW,
    LOWEST
}

@Entity
@Table(name = "task")
@EntityListeners(AuditingEntityListener::class)
class Task (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    var name: String,

    var description: String? = null,

    @Enumerated(EnumType.STRING)
    var status: TaskStatus = TaskStatus.TODO,

    @Enumerated(EnumType.STRING)
    var priority: TaskPriority = TaskPriority.MEDIUM,

    var dueDate: Instant? = null,

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    val createdAt: Instant = Instant.now(),

    @Column(name = "updated_at")
    @LastModifiedDate
    var updatedAt: Instant = Instant.now()
)