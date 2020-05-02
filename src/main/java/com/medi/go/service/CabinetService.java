package com.medi.go.service;

import com.medi.go.domain.Cabinet;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Cabinet}.
 */
public interface CabinetService {

    /**
     * Save a cabinet.
     *
     * @param cabinet the entity to save.
     * @return the persisted entity.
     */
    Cabinet save(Cabinet cabinet);

    /**
     * Get all the cabinets.
     *
     * @return the list of entities.
     */
    List<Cabinet> findAll();

    /**
     * Get the "id" cabinet.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Cabinet> findOne(String id);

    /**
     * Delete the "id" cabinet.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
