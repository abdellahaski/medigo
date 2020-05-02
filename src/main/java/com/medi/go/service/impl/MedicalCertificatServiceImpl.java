package com.medi.go.service.impl;

import com.medi.go.service.MedicalCertificatService;
import com.medi.go.domain.MedicalCertificat;
import com.medi.go.repository.MedicalCertificatRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link MedicalCertificat}.
 */
@Service
public class MedicalCertificatServiceImpl implements MedicalCertificatService {

    private final Logger log = LoggerFactory.getLogger(MedicalCertificatServiceImpl.class);

    private final MedicalCertificatRepository medicalCertificatRepository;

    public MedicalCertificatServiceImpl(MedicalCertificatRepository medicalCertificatRepository) {
        this.medicalCertificatRepository = medicalCertificatRepository;
    }

    /**
     * Save a medicalCertificat.
     *
     * @param medicalCertificat the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MedicalCertificat save(MedicalCertificat medicalCertificat) {
        log.debug("Request to save MedicalCertificat : {}", medicalCertificat);
        return medicalCertificatRepository.save(medicalCertificat);
    }

    /**
     * Get all the medicalCertificats.
     *
     * @return the list of entities.
     */
    @Override
    public List<MedicalCertificat> findAll() {
        log.debug("Request to get all MedicalCertificats");
        return medicalCertificatRepository.findAll();
    }

    /**
     * Get one medicalCertificat by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<MedicalCertificat> findOne(String id) {
        log.debug("Request to get MedicalCertificat : {}", id);
        return medicalCertificatRepository.findById(id);
    }

    /**
     * Delete the medicalCertificat by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete MedicalCertificat : {}", id);
        medicalCertificatRepository.deleteById(id);
    }
}
