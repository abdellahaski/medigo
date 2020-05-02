package com.medi.go.service.impl;

import com.medi.go.service.MyUserService;
import com.medi.go.domain.MyUser;
import com.medi.go.repository.MyUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link MyUser}.
 */
@Service
public class MyUserServiceImpl implements MyUserService {

    private final Logger log = LoggerFactory.getLogger(MyUserServiceImpl.class);

    private final MyUserRepository myUserRepository;

    public MyUserServiceImpl(MyUserRepository myUserRepository) {
        this.myUserRepository = myUserRepository;
    }

    /**
     * Save a myUser.
     *
     * @param myUser the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MyUser save(MyUser myUser) {
        log.debug("Request to save MyUser : {}", myUser);
        return myUserRepository.save(myUser);
    }

    /**
     * Get all the myUsers.
     *
     * @return the list of entities.
     */
    @Override
    public List<MyUser> findAll() {
        log.debug("Request to get all MyUsers");
        return myUserRepository.findAll();
    }

    /**
     * Get one myUser by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<MyUser> findOne(String id) {
        log.debug("Request to get MyUser : {}", id);
        return myUserRepository.findById(id);
    }

    /**
     * Delete the myUser by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete MyUser : {}", id);
        myUserRepository.deleteById(id);
    }
}
