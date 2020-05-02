package com.medi.go.service;

import com.medi.go.domain.MedicalCertificat;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link MedicalCertificat}.
 */
public interface MedicalCertificatService {

    /**
     * Save a medicalCertificat.
     *
     * @param medicalCertificat the entity to save.
     * @return the persisted entity.
     */
    MedicalCertificat save(MedicalCertificat medicalCertificat);

    /**
     * Get all the medicalCertificats.
     *
     * @return the list of entities.
     */
    List<MedicalCertificat> findAll();

    /**
     * Get the "id" medicalCertificat.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MedicalCertificat> findOne(String id);

    /**
     * Delete the "id" medicalCertificat.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
