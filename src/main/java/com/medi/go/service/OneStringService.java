package com.medi.go.service;

import com.medi.go.domain.OneString;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link OneString}.
 */
public interface OneStringService {

    /**
     * Save a oneString.
     *
     * @param oneString the entity to save.
     * @return the persisted entity.
     */
    OneString save(OneString oneString);

    /**
     * Get all the oneStrings.
     *
     * @return the list of entities.
     */
    List<OneString> findAll();

    /**
     * Get the "id" oneString.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OneString> findOne(String id);

    /**
     * Delete the "id" oneString.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
