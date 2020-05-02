package com.medi.go.web.rest;

import com.medi.go.MediGoApp;
import com.medi.go.domain.MyUser;
import com.medi.go.repository.MyUserRepository;
import com.medi.go.service.MyUserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MyUserResource} REST controller.
 */
@SpringBootTest(classes = MediGoApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MyUserResourceIT {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CIN = "AAAAAAAAAA";
    private static final String UPDATED_CIN = "BBBBBBBBBB";

    @Autowired
    private MyUserRepository myUserRepository;

    @Autowired
    private MyUserService myUserService;

    @Autowired
    private MockMvc restMyUserMockMvc;

    private MyUser myUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MyUser createEntity() {
        MyUser myUser = new MyUser()
            .username(DEFAULT_USERNAME)
            .password(DEFAULT_PASSWORD)
            .email(DEFAULT_EMAIL)
            .active(DEFAULT_ACTIVE)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .cin(DEFAULT_CIN);
        return myUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MyUser createUpdatedEntity() {
        MyUser myUser = new MyUser()
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD)
            .email(UPDATED_EMAIL)
            .active(UPDATED_ACTIVE)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .cin(UPDATED_CIN);
        return myUser;
    }

    @BeforeEach
    public void initTest() {
        myUserRepository.deleteAll();
        myUser = createEntity();
    }

    @Test
    public void createMyUser() throws Exception {
        int databaseSizeBeforeCreate = myUserRepository.findAll().size();

        // Create the MyUser
        restMyUserMockMvc.perform(post("/api/my-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(myUser)))
            .andExpect(status().isCreated());

        // Validate the MyUser in the database
        List<MyUser> myUserList = myUserRepository.findAll();
        assertThat(myUserList).hasSize(databaseSizeBeforeCreate + 1);
        MyUser testMyUser = myUserList.get(myUserList.size() - 1);
        assertThat(testMyUser.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testMyUser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testMyUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testMyUser.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testMyUser.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testMyUser.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testMyUser.getCin()).isEqualTo(DEFAULT_CIN);
    }

    @Test
    public void createMyUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = myUserRepository.findAll().size();

        // Create the MyUser with an existing ID
        myUser.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMyUserMockMvc.perform(post("/api/my-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(myUser)))
            .andExpect(status().isBadRequest());

        // Validate the MyUser in the database
        List<MyUser> myUserList = myUserRepository.findAll();
        assertThat(myUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllMyUsers() throws Exception {
        // Initialize the database
        myUserRepository.save(myUser);

        // Get all the myUserList
        restMyUserMockMvc.perform(get("/api/my-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(myUser.getId())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].cin").value(hasItem(DEFAULT_CIN)));
    }
    
    @Test
    public void getMyUser() throws Exception {
        // Initialize the database
        myUserRepository.save(myUser);

        // Get the myUser
        restMyUserMockMvc.perform(get("/api/my-users/{id}", myUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(myUser.getId()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.cin").value(DEFAULT_CIN));
    }

    @Test
    public void getNonExistingMyUser() throws Exception {
        // Get the myUser
        restMyUserMockMvc.perform(get("/api/my-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMyUser() throws Exception {
        // Initialize the database
        myUserService.save(myUser);

        int databaseSizeBeforeUpdate = myUserRepository.findAll().size();

        // Update the myUser
        MyUser updatedMyUser = myUserRepository.findById(myUser.getId()).get();
        updatedMyUser
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD)
            .email(UPDATED_EMAIL)
            .active(UPDATED_ACTIVE)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .cin(UPDATED_CIN);

        restMyUserMockMvc.perform(put("/api/my-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMyUser)))
            .andExpect(status().isOk());

        // Validate the MyUser in the database
        List<MyUser> myUserList = myUserRepository.findAll();
        assertThat(myUserList).hasSize(databaseSizeBeforeUpdate);
        MyUser testMyUser = myUserList.get(myUserList.size() - 1);
        assertThat(testMyUser.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testMyUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testMyUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testMyUser.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testMyUser.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testMyUser.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testMyUser.getCin()).isEqualTo(UPDATED_CIN);
    }

    @Test
    public void updateNonExistingMyUser() throws Exception {
        int databaseSizeBeforeUpdate = myUserRepository.findAll().size();

        // Create the MyUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMyUserMockMvc.perform(put("/api/my-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(myUser)))
            .andExpect(status().isBadRequest());

        // Validate the MyUser in the database
        List<MyUser> myUserList = myUserRepository.findAll();
        assertThat(myUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMyUser() throws Exception {
        // Initialize the database
        myUserService.save(myUser);

        int databaseSizeBeforeDelete = myUserRepository.findAll().size();

        // Delete the myUser
        restMyUserMockMvc.perform(delete("/api/my-users/{id}", myUser.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MyUser> myUserList = myUserRepository.findAll();
        assertThat(myUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
