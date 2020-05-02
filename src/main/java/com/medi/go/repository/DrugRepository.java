package com.medi.go.repository;

import com.medi.go.domain.Drug;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Drug entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DrugRepository extends MongoRepository<Drug, String> {
}
