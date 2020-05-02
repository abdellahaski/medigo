package com.medi.go.service.impl;

import com.medi.go.service.CabinetService;
import com.medi.go.domain.Cabinet;
import com.medi.go.repository.CabinetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Cabinet}.
 */
@Service
public class CabinetServiceImpl implements CabinetService {

    private final Logger log = LoggerFactory.getLogger(CabinetServiceImpl.class);

    private final CabinetRepository cabinetRepository;

    public CabinetServiceImpl(CabinetRepository cabinetRepository) {
        this.cabinetRepository = cabinetRepository;
    }

    /**
     * Save a cabinet.
     *
     * @param cabinet the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Cabinet save(Cabinet cabinet) {
        log.debug("Request to save Cabinet : {}", cabinet);
        return cabinetRepository.save(cabinet);
    }

    /**
     * Get all the cabinets.
     *
     * @return the list of entities.
     */
    @Override
    public List<Cabinet> findAll() {
        log.debug("Request to get all Cabinets");
        return cabinetRepository.findAll();
    }

    /**
     * Get one cabinet by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<Cabinet> findOne(String id) {
        log.debug("Request to get Cabinet : {}", id);
        return cabinetRepository.findById(id);
    }

    /**
     * Delete the cabinet by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Cabinet : {}", id);
        cabinetRepository.deleteById(id);
    }
}
