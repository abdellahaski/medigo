package com.medi.go.repository;

import com.medi.go.domain.Consultation;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Consultation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsultationRepository extends MongoRepository<Consultation, String> {
}
