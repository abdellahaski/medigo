package com.medi.go.web.rest;

import com.medi.go.domain.CustomLine;
import com.medi.go.service.CustomLineService;
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
 * REST controller for managing {@link com.medi.go.domain.CustomLine}.
 */
@RestController
@RequestMapping("/api")
public class CustomLineResource {

    private final Logger log = LoggerFactory.getLogger(CustomLineResource.class);

    private static final String ENTITY_NAME = "customLine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomLineService customLineService;

    public CustomLineResource(CustomLineService customLineService) {
        this.customLineService = customLineService;
    }

    /**
     * {@code POST  /custom-lines} : Create a new customLine.
     *
     * @param customLine the customLine to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customLine, or with status {@code 400 (Bad Request)} if the customLine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/custom-lines")
    public ResponseEntity<CustomLine> createCustomLine(@RequestBody CustomLine customLine) throws URISyntaxException {
        log.debug("REST request to save CustomLine : {}", customLine);
        if (customLine.getId() != null) {
            throw new BadRequestAlertException("A new customLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomLine result = customLineService.save(customLine);
        return ResponseEntity.created(new URI("/api/custom-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /custom-lines} : Updates an existing customLine.
     *
     * @param customLine the customLine to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customLine,
     * or with status {@code 400 (Bad Request)} if the customLine is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customLine couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/custom-lines")
    public ResponseEntity<CustomLine> updateCustomLine(@RequestBody CustomLine customLine) throws URISyntaxException {
        log.debug("REST request to update CustomLine : {}", customLine);
        if (customLine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomLine result = customLineService.save(customLine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customLine.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /custom-lines} : get all the customLines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customLines in body.
     */
    @GetMapping("/custom-lines")
    public List<CustomLine> getAllCustomLines() {
        log.debug("REST request to get all CustomLines");
        return customLineService.findAll();
    }

    /**
     * {@code GET  /custom-lines/:id} : get the "id" customLine.
     *
     * @param id the id of the customLine to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customLine, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/custom-lines/{id}")
    public ResponseEntity<CustomLine> getCustomLine(@PathVariable String id) {
        log.debug("REST request to get CustomLine : {}", id);
        Optional<CustomLine> customLine = customLineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customLine);
    }

    /**
     * {@code DELETE  /custom-lines/:id} : delete the "id" customLine.
     *
     * @param id the id of the customLine to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/custom-lines/{id}")
    public ResponseEntity<Void> deleteCustomLine(@PathVariable String id) {
        log.debug("REST request to delete CustomLine : {}", id);
        customLineService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
