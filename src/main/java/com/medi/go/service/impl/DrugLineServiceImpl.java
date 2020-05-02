package com.medi.go.service.impl;

import com.medi.go.service.DrugLineService;
import com.medi.go.domain.DrugLine;
import com.medi.go.repository.DrugLineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link DrugLine}.
 */
@Service
public class DrugLineServiceImpl implements DrugLineService {

    private final Logger log = LoggerFactory.getLogger(DrugLineServiceImpl.class);

    private final DrugLineRepository drugLineRepository;

    public DrugLineServiceImpl(DrugLineRepository drugLineRepository) {
        this.drugLineRepository = drugLineRepository;
    }

    /**
     * Save a drugLine.
     *
     * @param drugLine the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DrugLine save(DrugLine drugLine) {
        log.debug("Request to save DrugLine : {}", drugLine);
        return drugLineRepository.save(drugLine);
    }

    /**
     * Get all the drugLines.
     *
     * @return the list of entities.
     */
    @Override
    public List<DrugLine> findAll() {
        log.debug("Request to get all DrugLines");
        return drugLineRepository.findAll();
    }

    /**
     * Get one drugLine by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<DrugLine> findOne(String id) {
        log.debug("Request to get DrugLine : {}", id);
        return drugLineRepository.findById(id);
    }

    /**
     * Delete the drugLine by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete DrugLine : {}", id);
        drugLineRepository.deleteById(id);
    }
}
