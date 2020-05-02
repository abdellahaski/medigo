package com.medi.go.service.impl;

import com.medi.go.service.ConsultationService;
import com.medi.go.domain.Consultation;
import com.medi.go.repository.ConsultationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Consultation}.
 */
@Service
public class ConsultationServiceImpl implements ConsultationService {

    private final Logger log = LoggerFactory.getLogger(ConsultationServiceImpl.class);

    private final ConsultationRepository consultationRepository;

    public ConsultationServiceImpl(ConsultationRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
    }

    /**
     * Save a consultation.
     *
     * @param consultation the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Consultation save(Consultation consultation) {
        log.debug("Request to save Consultation : {}", consultation);
        return consultationRepository.save(consultation);
    }

    /**
     * Get all the consultations.
     *
     * @return the list of entities.
     */
    @Override
    public List<Consultation> findAll() {
        log.debug("Request to get all Consultations");
        return consultationRepository.findAll();
    }

    /**
     * Get one consultation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<Consultation> findOne(String id) {
        log.debug("Request to get Consultation : {}", id);
        return consultationRepository.findById(id);
    }

    /**
     * Delete the consultation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Consultation : {}", id);
        consultationRepository.deleteById(id);
    }
}
