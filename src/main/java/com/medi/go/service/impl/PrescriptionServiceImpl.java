package com.medi.go.service.impl;

import com.medi.go.service.PrescriptionService;
import com.medi.go.domain.Prescription;
import com.medi.go.repository.PrescriptionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Prescription}.
 */
@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final Logger log = LoggerFactory.getLogger(PrescriptionServiceImpl.class);

    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionServiceImpl(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    /**
     * Save a prescription.
     *
     * @param prescription the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Prescription save(Prescription prescription) {
        log.debug("Request to save Prescription : {}", prescription);
        return prescriptionRepository.save(prescription);
    }

    /**
     * Get all the prescriptions.
     *
     * @return the list of entities.
     */
    @Override
    public List<Prescription> findAll() {
        log.debug("Request to get all Prescriptions");
        return prescriptionRepository.findAll();
    }

    /**
     * Get one prescription by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<Prescription> findOne(String id) {
        log.debug("Request to get Prescription : {}", id);
        return prescriptionRepository.findById(id);
    }

    /**
     * Delete the prescription by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Prescription : {}", id);
        prescriptionRepository.deleteById(id);
    }
}
