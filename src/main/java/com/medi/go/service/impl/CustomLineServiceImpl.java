package com.medi.go.service.impl;

import com.medi.go.service.CustomLineService;
import com.medi.go.domain.CustomLine;
import com.medi.go.repository.CustomLineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CustomLine}.
 */
@Service
public class CustomLineServiceImpl implements CustomLineService {

    private final Logger log = LoggerFactory.getLogger(CustomLineServiceImpl.class);

    private final CustomLineRepository customLineRepository;

    public CustomLineServiceImpl(CustomLineRepository customLineRepository) {
        this.customLineRepository = customLineRepository;
    }

    /**
     * Save a customLine.
     *
     * @param customLine the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CustomLine save(CustomLine customLine) {
        log.debug("Request to save CustomLine : {}", customLine);
        return customLineRepository.save(customLine);
    }

    /**
     * Get all the customLines.
     *
     * @return the list of entities.
     */
    @Override
    public List<CustomLine> findAll() {
        log.debug("Request to get all CustomLines");
        return customLineRepository.findAll();
    }

    /**
     * Get one customLine by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<CustomLine> findOne(String id) {
        log.debug("Request to get CustomLine : {}", id);
        return customLineRepository.findById(id);
    }

    /**
     * Delete the customLine by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete CustomLine : {}", id);
        customLineRepository.deleteById(id);
    }
}
