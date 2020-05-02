package com.medi.go.web.rest;

import com.medi.go.MediGoApp;
import com.medi.go.domain.OneString;
import com.medi.go.repository.OneStringRepository;
import com.medi.go.service.OneStringService;

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
 * Integration tests for the {@link OneStringResource} REST controller.
 */
@SpringBootTest(classes = MediGoApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class OneStringResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private OneStringRepository oneStringRepository;

    @Autowired
    private OneStringService oneStringService;

    @Autowired
    private MockMvc restOneStringMockMvc;

    private OneString oneString;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OneString createEntity() {
        OneString oneString = new OneString()
            .content(DEFAULT_CONTENT);
        return oneString;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OneString createUpdatedEntity() {
        OneString oneString = new OneString()
            .content(UPDATED_CONTENT);
        return oneString;
    }

    @BeforeEach
    public void initTest() {
        oneStringRepository.deleteAll();
        oneString = createEntity();
    }

    @Test
    public void createOneString() throws Exception {
        int databaseSizeBeforeCreate = oneStringRepository.findAll().size();

        // Create the OneString
        restOneStringMockMvc.perform(post("/api/one-strings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oneString)))
            .andExpect(status().isCreated());

        // Validate the OneString in the database
        List<OneString> oneStringList = oneStringRepository.findAll();
        assertThat(oneStringList).hasSize(databaseSizeBeforeCreate + 1);
        OneString testOneString = oneStringList.get(oneStringList.size() - 1);
        assertThat(testOneString.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    public void createOneStringWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = oneStringRepository.findAll().size();

        // Create the OneString with an existing ID
        oneString.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOneStringMockMvc.perform(post("/api/one-strings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oneString)))
            .andExpect(status().isBadRequest());

        // Validate the OneString in the database
        List<OneString> oneStringList = oneStringRepository.findAll();
        assertThat(oneStringList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllOneStrings() throws Exception {
        // Initialize the database
        oneStringRepository.save(oneString);

        // Get all the oneStringList
        restOneStringMockMvc.perform(get("/api/one-strings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oneString.getId())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)));
    }
    
    @Test
    public void getOneString() throws Exception {
        // Initialize the database
        oneStringRepository.save(oneString);

        // Get the oneString
        restOneStringMockMvc.perform(get("/api/one-strings/{id}", oneString.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oneString.getId()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT));
    }

    @Test
    public void getNonExistingOneString() throws Exception {
        // Get the oneString
        restOneStringMockMvc.perform(get("/api/one-strings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOneString() throws Exception {
        // Initialize the database
        oneStringService.save(oneString);

        int databaseSizeBeforeUpdate = oneStringRepository.findAll().size();

        // Update the oneString
        OneString updatedOneString = oneStringRepository.findById(oneString.getId()).get();
        updatedOneString
            .content(UPDATED_CONTENT);

        restOneStringMockMvc.perform(put("/api/one-strings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOneString)))
            .andExpect(status().isOk());

        // Validate the OneString in the database
        List<OneString> oneStringList = oneStringRepository.findAll();
        assertThat(oneStringList).hasSize(databaseSizeBeforeUpdate);
        OneString testOneString = oneStringList.get(oneStringList.size() - 1);
        assertThat(testOneString.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    public void updateNonExistingOneString() throws Exception {
        int databaseSizeBeforeUpdate = oneStringRepository.findAll().size();

        // Create the OneString

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOneStringMockMvc.perform(put("/api/one-strings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oneString)))
            .andExpect(status().isBadRequest());

        // Validate the OneString in the database
        List<OneString> oneStringList = oneStringRepository.findAll();
        assertThat(oneStringList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOneString() throws Exception {
        // Initialize the database
        oneStringService.save(oneString);

        int databaseSizeBeforeDelete = oneStringRepository.findAll().size();

        // Delete the oneString
        restOneStringMockMvc.perform(delete("/api/one-strings/{id}", oneString.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OneString> oneStringList = oneStringRepository.findAll();
        assertThat(oneStringList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
