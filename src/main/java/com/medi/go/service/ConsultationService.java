package com.medi.go.service;

import com.medi.go.domain.Consultation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Consultation}.
 */
public interface ConsultationService {

    /**
     * Save a consultation.
     *
     * @param consultation the entity to save.
     * @return the persisted entity.
     */
    Consultation save(Consultation consultation);

    /**
     * Get all the consultations.
     *
     * @return the list of entities.
     */
    List<Consultation> findAll();

    /**
     * Get the "id" consultation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Consultation> findOne(String id);

    /**
     * Delete the "id" consultation.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
