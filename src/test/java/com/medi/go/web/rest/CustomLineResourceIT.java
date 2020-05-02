package com.medi.go.web.rest;

import com.medi.go.MediGoApp;
import com.medi.go.domain.CustomLine;
import com.medi.go.repository.CustomLineRepository;
import com.medi.go.service.CustomLineService;

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
 * Integration tests for the {@link CustomLineResource} REST controller.
 */
@SpringBootTest(classes = MediGoApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class CustomLineResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private CustomLineRepository customLineRepository;

    @Autowired
    private CustomLineService customLineService;

    @Autowired
    private MockMvc restCustomLineMockMvc;

    private CustomLine customLine;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomLine createEntity() {
        CustomLine customLine = new CustomLine()
            .content(DEFAULT_CONTENT);
        return customLine;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomLine createUpdatedEntity() {
        CustomLine customLine = new CustomLine()
            .content(UPDATED_CONTENT);
        return customLine;
    }

    @BeforeEach
    public void initTest() {
        customLineRepository.deleteAll();
        customLine = createEntity();
    }

    @Test
    public void createCustomLine() throws Exception {
        int databaseSizeBeforeCreate = customLineRepository.findAll().size();

        // Create the CustomLine
        restCustomLineMockMvc.perform(post("/api/custom-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customLine)))
            .andExpect(status().isCreated());

        // Validate the CustomLine in the database
        List<CustomLine> customLineList = customLineRepository.findAll();
        assertThat(customLineList).hasSize(databaseSizeBeforeCreate + 1);
        CustomLine testCustomLine = customLineList.get(customLineList.size() - 1);
        assertThat(testCustomLine.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    public void createCustomLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customLineRepository.findAll().size();

        // Create the CustomLine with an existing ID
        customLine.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomLineMockMvc.perform(post("/api/custom-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customLine)))
            .andExpect(status().isBadRequest());

        // Validate the CustomLine in the database
        List<CustomLine> customLineList = customLineRepository.findAll();
        assertThat(customLineList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllCustomLines() throws Exception {
        // Initialize the database
        customLineRepository.save(customLine);

        // Get all the customLineList
        restCustomLineMockMvc.perform(get("/api/custom-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customLine.getId())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)));
    }
    
    @Test
    public void getCustomLine() throws Exception {
        // Initialize the database
        customLineRepository.save(customLine);

        // Get the customLine
        restCustomLineMockMvc.perform(get("/api/custom-lines/{id}", customLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customLine.getId()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT));
    }

    @Test
    public void getNonExistingCustomLine() throws Exception {
        // Get the customLine
        restCustomLineMockMvc.perform(get("/api/custom-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCustomLine() throws Exception {
        // Initialize the database
        customLineService.save(customLine);

        int databaseSizeBeforeUpdate = customLineRepository.findAll().size();

        // Update the customLine
        CustomLine updatedCustomLine = customLineRepository.findById(customLine.getId()).get();
        updatedCustomLine
            .content(UPDATED_CONTENT);

        restCustomLineMockMvc.perform(put("/api/custom-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomLine)))
            .andExpect(status().isOk());

        // Validate the CustomLine in the database
        List<CustomLine> customLineList = customLineRepository.findAll();
        assertThat(customLineList).hasSize(databaseSizeBeforeUpdate);
        CustomLine testCustomLine = customLineList.get(customLineList.size() - 1);
        assertThat(testCustomLine.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    public void updateNonExistingCustomLine() throws Exception {
        int databaseSizeBeforeUpdate = customLineRepository.findAll().size();

        // Create the CustomLine

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomLineMockMvc.perform(put("/api/custom-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customLine)))
            .andExpect(status().isBadRequest());

        // Validate the CustomLine in the database
        List<CustomLine> customLineList = customLineRepository.findAll();
        assertThat(customLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCustomLine() throws Exception {
        // Initialize the database
        customLineService.save(customLine);

        int databaseSizeBeforeDelete = customLineRepository.findAll().size();

        // Delete the customLine
        restCustomLineMockMvc.perform(delete("/api/custom-lines/{id}", customLine.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomLine> customLineList = customLineRepository.findAll();
        assertThat(customLineList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
