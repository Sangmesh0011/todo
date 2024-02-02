package com.todoapp.todoapp;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface todoRepository extends MongoRepository<todo, String> {
    // Additional custom queries can be added here if needed
}

