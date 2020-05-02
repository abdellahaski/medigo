package com.medi.go.web.rest;

import com.medi.go.domain.OneString;
import com.medi.go.service.OneStringService;
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
 * REST controller for managing {@link com.medi.go.domain.OneString}.
 */
@RestController
@RequestMapping("/api")
public class OneStringResource {

    private final Logger log = LoggerFactory.getLogger(OneStringResource.class);

    private static final String ENTITY_NAME = "oneString";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OneStringService oneStringService;

    public OneStringResource(OneStringService oneStringService) {
        this.oneStringService = oneStringService;
    }

    /**
     * {@code POST  /one-strings} : Create a new oneString.
     *
     * @param oneString the oneString to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oneString, or with status {@code 400 (Bad Request)} if the oneString has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/one-strings")
    public ResponseEntity<OneString> createOneString(@RequestBody OneString oneString) throws URISyntaxException {
        log.debug("REST request to save OneString : {}", oneString);
        if (oneString.getId() != null) {
            throw new BadRequestAlertException("A new oneString cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OneString result = oneStringService.save(oneString);
        return ResponseEntity.created(new URI("/api/one-strings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /one-strings} : Updates an existing oneString.
     *
     * @param oneString the oneString to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oneString,
     * or with status {@code 400 (Bad Request)} if the oneString is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oneString couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/one-strings")
    public ResponseEntity<OneString> updateOneString(@RequestBody OneString oneString) throws URISyntaxException {
        log.debug("REST request to update OneString : {}", oneString);
        if (oneString.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OneString result = oneStringService.save(oneString);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oneString.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /one-strings} : get all the oneStrings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of oneStrings in body.
     */
    @GetMapping("/one-strings")
    public List<OneString> getAllOneStrings() {
        log.debug("REST request to get all OneStrings");
        return oneStringService.findAll();
    }

    /**
     * {@code GET  /one-strings/:id} : get the "id" oneString.
     *
     * @param id the id of the oneString to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oneString, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/one-strings/{id}")
    public ResponseEntity<OneString> getOneString(@PathVariable String id) {
        log.debug("REST request to get OneString : {}", id);
        Optional<OneString> oneString = oneStringService.findOne(id);
        return ResponseUtil.wrapOrNotFound(oneString);
    }

    /**
     * {@code DELETE  /one-strings/:id} : delete the "id" oneString.
     *
     * @param id the id of the oneString to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/one-strings/{id}")
    public ResponseEntity<Void> deleteOneString(@PathVariable String id) {
        log.debug("REST request to delete OneString : {}", id);
        oneStringService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
