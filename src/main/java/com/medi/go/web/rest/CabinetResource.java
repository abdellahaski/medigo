package com.medi.go.web.rest;

import com.medi.go.domain.Cabinet;
import com.medi.go.service.CabinetService;
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
 * REST controller for managing {@link com.medi.go.domain.Cabinet}.
 */
@RestController
@RequestMapping("/api")
public class CabinetResource {

    private final Logger log = LoggerFactory.getLogger(CabinetResource.class);

    private static final String ENTITY_NAME = "cabinet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CabinetService cabinetService;

    public CabinetResource(CabinetService cabinetService) {
        this.cabinetService = cabinetService;
    }

    /**
     * {@code POST  /cabinets} : Create a new cabinet.
     *
     * @param cabinet the cabinet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cabinet, or with status {@code 400 (Bad Request)} if the cabinet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cabinets")
    public ResponseEntity<Cabinet> createCabinet(@RequestBody Cabinet cabinet) throws URISyntaxException {
        log.debug("REST request to save Cabinet : {}", cabinet);
        if (cabinet.getId() != null) {
            throw new BadRequestAlertException("A new cabinet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cabinet result = cabinetService.save(cabinet);
        return ResponseEntity.created(new URI("/api/cabinets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cabinets} : Updates an existing cabinet.
     *
     * @param cabinet the cabinet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cabinet,
     * or with status {@code 400 (Bad Request)} if the cabinet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cabinet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cabinets")
    public ResponseEntity<Cabinet> updateCabinet(@RequestBody Cabinet cabinet) throws URISyntaxException {
        log.debug("REST request to update Cabinet : {}", cabinet);
        if (cabinet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cabinet result = cabinetService.save(cabinet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cabinet.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cabinets} : get all the cabinets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cabinets in body.
     */
    @GetMapping("/cabinets")
    public List<Cabinet> getAllCabinets() {
        log.debug("REST request to get all Cabinets");
        return cabinetService.findAll();
    }

    /**
     * {@code GET  /cabinets/:id} : get the "id" cabinet.
     *
     * @param id the id of the cabinet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cabinet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cabinets/{id}")
    public ResponseEntity<Cabinet> getCabinet(@PathVariable String id) {
        log.debug("REST request to get Cabinet : {}", id);
        Optional<Cabinet> cabinet = cabinetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cabinet);
    }

    /**
     * {@code DELETE  /cabinets/:id} : delete the "id" cabinet.
     *
     * @param id the id of the cabinet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cabinets/{id}")
    public ResponseEntity<Void> deleteCabinet(@PathVariable String id) {
        log.debug("REST request to delete Cabinet : {}", id);
        cabinetService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
