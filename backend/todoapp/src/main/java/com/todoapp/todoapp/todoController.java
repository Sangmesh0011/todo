package com.todoapp.todoapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/todos")
public class todoController {
    @Autowired
    private MongoRepository<todo, String> todoRepository;

    @GetMapping
    public List<todo> getAlltodos() {
        return todoRepository.findAll();
    }

    @GetMapping("/{id}")
    public todo gettodoById(@PathVariable String id) {
        return todoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public todo createtodo(@RequestBody todo todo) {
    	String randomId=UUID.randomUUID().toString().substring(0, 8);
    	todo.setId(randomId);
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public todo updateTodo(@PathVariable String id,@RequestBody todo todo) {
    	todo.setId(id);
    	return todoRepository.save(todo);
    }
    
 @DeleteMapping("/{id}")
    public void deletetodoById(@PathVariable String id) {
        todoRepository.deleteById(id);
    }
}

