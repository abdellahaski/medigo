package com.medi.go.service.impl;

import com.medi.go.service.OneStringService;
import com.medi.go.domain.OneString;
import com.medi.go.repository.OneStringRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link OneString}.
 */
@Service
public class OneStringServiceImpl implements OneStringService {

    private final Logger log = LoggerFactory.getLogger(OneStringServiceImpl.class);

    private final OneStringRepository oneStringRepository;

    public OneStringServiceImpl(OneStringRepository oneStringRepository) {
        this.oneStringRepository = oneStringRepository;
    }

    /**
     * Save a oneString.
     *
     * @param oneString the entity to save.
     * @return the persisted entity.
     */
    @Override
    public OneString save(OneString oneString) {
        log.debug("Request to save OneString : {}", oneString);
        return oneStringRepository.save(oneString);
    }

    /**
     * Get all the oneStrings.
     *
     * @return the list of entities.
     */
    @Override
    public List<OneString> findAll() {
        log.debug("Request to get all OneStrings");
        return oneStringRepository.findAll();
    }

    /**
     * Get one oneString by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<OneString> findOne(String id) {
        log.debug("Request to get OneString : {}", id);
        return oneStringRepository.findById(id);
    }

    /**
     * Delete the oneString by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete OneString : {}", id);
        oneStringRepository.deleteById(id);
    }
}
