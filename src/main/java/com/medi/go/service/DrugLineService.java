package com.medi.go.service;

import com.medi.go.domain.DrugLine;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link DrugLine}.
 */
public interface DrugLineService {

    /**
     * Save a drugLine.
     *
     * @param drugLine the entity to save.
     * @return the persisted entity.
     */
    DrugLine save(DrugLine drugLine);

    /**
     * Get all the drugLines.
     *
     * @return the list of entities.
     */
    List<DrugLine> findAll();

    /**
     * Get the "id" drugLine.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DrugLine> findOne(String id);

    /**
     * Delete the "id" drugLine.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
