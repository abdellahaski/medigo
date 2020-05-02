package com.medi.go.repository;

import com.medi.go.domain.DrugLine;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the DrugLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DrugLineRepository extends MongoRepository<DrugLine, String> {
}
