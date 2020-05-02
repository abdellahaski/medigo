package com.medi.go.repository;

import com.medi.go.domain.Cabinet;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Cabinet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CabinetRepository extends MongoRepository<Cabinet, String> {
}
