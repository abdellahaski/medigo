package com.medi.go.repository;

import com.medi.go.domain.MedicalCertificat;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the MedicalCertificat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicalCertificatRepository extends MongoRepository<MedicalCertificat, String> {
}
