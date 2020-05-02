package com.medi.go.web.rest;

import com.medi.go.domain.MedicalCertificat;
import com.medi.go.service.MedicalCertificatService;
import com.medi.go.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.medi.go.domain.MedicalCertificat}.
 */
@RestController
@RequestMapping("/api")
public class MedicalCertificatResource {

    private final Logger log = LoggerFactory.getLogger(MedicalCertificatResource.class);

    private static final String ENTITY_NAME = "medicalCertificat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MedicalCertificatService medicalCertificatService;

    public MedicalCertificatResource(MedicalCertificatService medicalCertificatService) {
        this.medicalCertificatService = medicalCertificatService;
    }

    /**
     * {@code POST  /medical-certificats} : Create a new medicalCertificat.
     *
     * @param medicalCertificat the medicalCertificat to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new medicalCertificat, or with status {@code 400 (Bad Request)} if the medicalCertificat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/medical-certificats")
    public ResponseEntity<MedicalCertificat> createMedicalCertificat(@RequestBody MedicalCertificat medicalCertificat) throws URISyntaxException {
        log.debug("REST request to save MedicalCertificat : {}", medicalCertificat);
        if (medicalCertificat.getId() != null) {
            throw new BadRequestAlertException("A new medicalCertificat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedicalCertificat result = medicalCertificatService.save(medicalCertificat);
        return ResponseEntity.created(new URI("/api/medical-certificats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /medical-certificats} : Updates an existing medicalCertificat.
     *
     * @param medicalCertificat the medicalCertificat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medicalCertificat,
     * or with status {@code 400 (Bad Request)} if the medicalCertificat is not valid,
     * or with status {@code 500 (Internal Server Error)} if the medicalCertificat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/medical-certificats")
    public ResponseEntity<MedicalCertificat> updateMedicalCertificat(@RequestBody MedicalCertificat medicalCertificat) throws URISyntaxException {
        log.debug("REST request to update MedicalCertificat : {}", medicalCertificat);
        if (medicalCertificat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedicalCertificat result = medicalCertificatService.save(medicalCertificat);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, medicalCertificat.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /medical-certificats} : get all the medicalCertificats.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of medicalCertificats in body.
     */
    @GetMapping("/medical-certificats")
    public List<MedicalCertificat> getAllMedicalCertificats() {
        log.debug("REST request to get all MedicalCertificats");
        return medicalCertificatService.findAll();
    }

    /**
     * {@code GET  /medical-certificats/:id} : get the "id" medicalCertificat.
     *
     * @param id the id of the medicalCertificat to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the medicalCertificat, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/medical-certificats/{id}")
    public ResponseEntity<MedicalCertificat> getMedicalCertificat(@PathVariable String id) {
        log.debug("REST request to get MedicalCertificat : {}", id);
        Optional<MedicalCertificat> medicalCertificat = medicalCertificatService.findOne(id);
        return ResponseUtil.wrapOrNotFound(medicalCertificat);
    }

    /**
     * {@code DELETE  /medical-certificats/:id} : delete the "id" medicalCertificat.
     *
     * @param id the id of the medicalCertificat to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/medical-certificats/{id}")
    public ResponseEntity<Void> deleteMedicalCertificat(@PathVariable String id) {
        log.debug("REST request to delete MedicalCertificat : {}", id);
        medicalCertificatService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
