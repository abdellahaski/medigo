package com.medi.go.web.rest;

import com.medi.go.domain.DrugLine;
import com.medi.go.service.DrugLineService;
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
 * REST controller for managing {@link com.medi.go.domain.DrugLine}.
 */
@RestController
@RequestMapping("/api")
public class DrugLineResource {

    private final Logger log = LoggerFactory.getLogger(DrugLineResource.class);

    private static final String ENTITY_NAME = "drugLine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DrugLineService drugLineService;

    public DrugLineResource(DrugLineService drugLineService) {
        this.drugLineService = drugLineService;
    }

    /**
     * {@code POST  /drug-lines} : Create a new drugLine.
     *
     * @param drugLine the drugLine to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new drugLine, or with status {@code 400 (Bad Request)} if the drugLine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/drug-lines")
    public ResponseEntity<DrugLine> createDrugLine(@RequestBody DrugLine drugLine) throws URISyntaxException {
        log.debug("REST request to save DrugLine : {}", drugLine);
        if (drugLine.getId() != null) {
            throw new BadRequestAlertException("A new drugLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DrugLine result = drugLineService.save(drugLine);
        return ResponseEntity.created(new URI("/api/drug-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /drug-lines} : Updates an existing drugLine.
     *
     * @param drugLine the drugLine to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated drugLine,
     * or with status {@code 400 (Bad Request)} if the drugLine is not valid,
     * or with status {@code 500 (Internal Server Error)} if the drugLine couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/drug-lines")
    public ResponseEntity<DrugLine> updateDrugLine(@RequestBody DrugLine drugLine) throws URISyntaxException {
        log.debug("REST request to update DrugLine : {}", drugLine);
        if (drugLine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DrugLine result = drugLineService.save(drugLine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, drugLine.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /drug-lines} : get all the drugLines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of drugLines in body.
     */
    @GetMapping("/drug-lines")
    public List<DrugLine> getAllDrugLines() {
        log.debug("REST request to get all DrugLines");
        return drugLineService.findAll();
    }

    /**
     * {@code GET  /drug-lines/:id} : get the "id" drugLine.
     *
     * @param id the id of the drugLine to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the drugLine, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/drug-lines/{id}")
    public ResponseEntity<DrugLine> getDrugLine(@PathVariable String id) {
        log.debug("REST request to get DrugLine : {}", id);
        Optional<DrugLine> drugLine = drugLineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(drugLine);
    }

    /**
     * {@code DELETE  /drug-lines/:id} : delete the "id" drugLine.
     *
     * @param id the id of the drugLine to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/drug-lines/{id}")
    public ResponseEntity<Void> deleteDrugLine(@PathVariable String id) {
        log.debug("REST request to delete DrugLine : {}", id);
        drugLineService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
