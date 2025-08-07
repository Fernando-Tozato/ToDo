package inac.fernando.aulas.projetos.todo_list

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HelloWorld {

    @GetMapping("/hello")
    fun helloWorld(model: Model): String {
        model.addAttribute("text", "Hello, this is a Spring Boot application with Kotlin and Mustache!")
        return "hello"
    }
}