package com.medi.go.service;

import com.medi.go.domain.CustomLine;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CustomLine}.
 */
public interface CustomLineService {

    /**
     * Save a customLine.
     *
     * @param customLine the entity to save.
     * @return the persisted entity.
     */
    CustomLine save(CustomLine customLine);

    /**
     * Get all the customLines.
     *
     * @return the list of entities.
     */
    List<CustomLine> findAll();

    /**
     * Get the "id" customLine.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CustomLine> findOne(String id);

    /**
     * Delete the "id" customLine.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
