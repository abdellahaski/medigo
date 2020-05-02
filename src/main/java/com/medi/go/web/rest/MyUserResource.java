package com.medi.go.web.rest;

import com.medi.go.domain.MyUser;
import com.medi.go.service.MyUserService;
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
 * REST controller for managing {@link com.medi.go.domain.MyUser}.
 */
@RestController
@RequestMapping("/api")
public class MyUserResource {

    private final Logger log = LoggerFactory.getLogger(MyUserResource.class);

    private static final String ENTITY_NAME = "myUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MyUserService myUserService;

    public MyUserResource(MyUserService myUserService) {
        this.myUserService = myUserService;
    }

    /**
     * {@code POST  /my-users} : Create a new myUser.
     *
     * @param myUser the myUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new myUser, or with status {@code 400 (Bad Request)} if the myUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/my-users")
    public ResponseEntity<MyUser> createMyUser(@RequestBody MyUser myUser) throws URISyntaxException {
        log.debug("REST request to save MyUser : {}", myUser);
        if (myUser.getId() != null) {
            throw new BadRequestAlertException("A new myUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MyUser result = myUserService.save(myUser);
        return ResponseEntity.created(new URI("/api/my-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /my-users} : Updates an existing myUser.
     *
     * @param myUser the myUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated myUser,
     * or with status {@code 400 (Bad Request)} if the myUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the myUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/my-users")
    public ResponseEntity<MyUser> updateMyUser(@RequestBody MyUser myUser) throws URISyntaxException {
        log.debug("REST request to update MyUser : {}", myUser);
        if (myUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MyUser result = myUserService.save(myUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, myUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /my-users} : get all the myUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of myUsers in body.
     */
    @GetMapping("/my-users")
    public List<MyUser> getAllMyUsers() {
        log.debug("REST request to get all MyUsers");
        return myUserService.findAll();
    }

    /**
     * {@code GET  /my-users/:id} : get the "id" myUser.
     *
     * @param id the id of the myUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the myUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/my-users/{id}")
    public ResponseEntity<MyUser> getMyUser(@PathVariable String id) {
        log.debug("REST request to get MyUser : {}", id);
        Optional<MyUser> myUser = myUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(myUser);
    }

    /**
     * {@code DELETE  /my-users/:id} : delete the "id" myUser.
     *
     * @param id the id of the myUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/my-users/{id}")
    public ResponseEntity<Void> deleteMyUser(@PathVariable String id) {
        log.debug("REST request to delete MyUser : {}", id);
        myUserService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
