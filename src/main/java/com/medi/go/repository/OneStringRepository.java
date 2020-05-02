package com.medi.go.repository;

import com.medi.go.domain.OneString;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the OneString entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OneStringRepository extends MongoRepository<OneString, String> {
}
