package com.medi.go.repository;

import com.medi.go.domain.CustomLine;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CustomLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomLineRepository extends MongoRepository<CustomLine, String> {
}
