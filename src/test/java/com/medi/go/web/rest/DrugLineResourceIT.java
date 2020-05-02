package com.medi.go.web.rest;

import com.medi.go.MediGoApp;
import com.medi.go.domain.DrugLine;
import com.medi.go.repository.DrugLineRepository;
import com.medi.go.service.DrugLineService;

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
 * Integration tests for the {@link DrugLineResource} REST controller.
 */
@SpringBootTest(classes = MediGoApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DrugLineResourceIT {

    private static final Integer DEFAULT_DOSE_MATIN = 1;
    private static final Integer UPDATED_DOSE_MATIN = 2;

    private static final Integer DEFAULT_DOSE_MIDI = 1;
    private static final Integer UPDATED_DOSE_MIDI = 2;

    private static final Integer DEFAULT_DOSE_SOIR = 1;
    private static final Integer UPDATED_DOSE_SOIR = 2;

    private static final String DEFAULT_AFTER_BEFORE = "AAAAAAAAAA";
    private static final String UPDATED_AFTER_BEFORE = "BBBBBBBBBB";

    private static final Integer DEFAULT_DURATION = 1;
    private static final Integer UPDATED_DURATION = 2;

    @Autowired
    private DrugLineRepository drugLineRepository;

    @Autowired
    private DrugLineService drugLineService;

    @Autowired
    private MockMvc restDrugLineMockMvc;

    private DrugLine drugLine;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DrugLine createEntity() {
        DrugLine drugLine = new DrugLine()
            .doseMatin(DEFAULT_DOSE_MATIN)
            .doseMidi(DEFAULT_DOSE_MIDI)
            .doseSoir(DEFAULT_DOSE_SOIR)
            .afterBefore(DEFAULT_AFTER_BEFORE)
            .duration(DEFAULT_DURATION);
        return drugLine;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DrugLine createUpdatedEntity() {
        DrugLine drugLine = new DrugLine()
            .doseMatin(UPDATED_DOSE_MATIN)
            .doseMidi(UPDATED_DOSE_MIDI)
            .doseSoir(UPDATED_DOSE_SOIR)
            .afterBefore(UPDATED_AFTER_BEFORE)
            .duration(UPDATED_DURATION);
        return drugLine;
    }

    @BeforeEach
    public void initTest() {
        drugLineRepository.deleteAll();
        drugLine = createEntity();
    }

    @Test
    public void createDrugLine() throws Exception {
        int databaseSizeBeforeCreate = drugLineRepository.findAll().size();

        // Create the DrugLine
        restDrugLineMockMvc.perform(post("/api/drug-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drugLine)))
            .andExpect(status().isCreated());

        // Validate the DrugLine in the database
        List<DrugLine> drugLineList = drugLineRepository.findAll();
        assertThat(drugLineList).hasSize(databaseSizeBeforeCreate + 1);
        DrugLine testDrugLine = drugLineList.get(drugLineList.size() - 1);
        assertThat(testDrugLine.getDoseMatin()).isEqualTo(DEFAULT_DOSE_MATIN);
        assertThat(testDrugLine.getDoseMidi()).isEqualTo(DEFAULT_DOSE_MIDI);
        assertThat(testDrugLine.getDoseSoir()).isEqualTo(DEFAULT_DOSE_SOIR);
        assertThat(testDrugLine.getAfterBefore()).isEqualTo(DEFAULT_AFTER_BEFORE);
        assertThat(testDrugLine.getDuration()).isEqualTo(DEFAULT_DURATION);
    }

    @Test
    public void createDrugLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = drugLineRepository.findAll().size();

        // Create the DrugLine with an existing ID
        drugLine.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restDrugLineMockMvc.perform(post("/api/drug-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drugLine)))
            .andExpect(status().isBadRequest());

        // Validate the DrugLine in the database
        List<DrugLine> drugLineList = drugLineRepository.findAll();
        assertThat(drugLineList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllDrugLines() throws Exception {
        // Initialize the database
        drugLineRepository.save(drugLine);

        // Get all the drugLineList
        restDrugLineMockMvc.perform(get("/api/drug-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(drugLine.getId())))
            .andExpect(jsonPath("$.[*].doseMatin").value(hasItem(DEFAULT_DOSE_MATIN)))
            .andExpect(jsonPath("$.[*].doseMidi").value(hasItem(DEFAULT_DOSE_MIDI)))
            .andExpect(jsonPath("$.[*].doseSoir").value(hasItem(DEFAULT_DOSE_SOIR)))
            .andExpect(jsonPath("$.[*].afterBefore").value(hasItem(DEFAULT_AFTER_BEFORE)))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)));
    }
    
    @Test
    public void getDrugLine() throws Exception {
        // Initialize the database
        drugLineRepository.save(drugLine);

        // Get the drugLine
        restDrugLineMockMvc.perform(get("/api/drug-lines/{id}", drugLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(drugLine.getId()))
            .andExpect(jsonPath("$.doseMatin").value(DEFAULT_DOSE_MATIN))
            .andExpect(jsonPath("$.doseMidi").value(DEFAULT_DOSE_MIDI))
            .andExpect(jsonPath("$.doseSoir").value(DEFAULT_DOSE_SOIR))
            .andExpect(jsonPath("$.afterBefore").value(DEFAULT_AFTER_BEFORE))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION));
    }

    @Test
    public void getNonExistingDrugLine() throws Exception {
        // Get the drugLine
        restDrugLineMockMvc.perform(get("/api/drug-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDrugLine() throws Exception {
        // Initialize the database
        drugLineService.save(drugLine);

        int databaseSizeBeforeUpdate = drugLineRepository.findAll().size();

        // Update the drugLine
        DrugLine updatedDrugLine = drugLineRepository.findById(drugLine.getId()).get();
        updatedDrugLine
            .doseMatin(UPDATED_DOSE_MATIN)
            .doseMidi(UPDATED_DOSE_MIDI)
            .doseSoir(UPDATED_DOSE_SOIR)
            .afterBefore(UPDATED_AFTER_BEFORE)
            .duration(UPDATED_DURATION);

        restDrugLineMockMvc.perform(put("/api/drug-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDrugLine)))
            .andExpect(status().isOk());

        // Validate the DrugLine in the database
        List<DrugLine> drugLineList = drugLineRepository.findAll();
        assertThat(drugLineList).hasSize(databaseSizeBeforeUpdate);
        DrugLine testDrugLine = drugLineList.get(drugLineList.size() - 1);
        assertThat(testDrugLine.getDoseMatin()).isEqualTo(UPDATED_DOSE_MATIN);
        assertThat(testDrugLine.getDoseMidi()).isEqualTo(UPDATED_DOSE_MIDI);
        assertThat(testDrugLine.getDoseSoir()).isEqualTo(UPDATED_DOSE_SOIR);
        assertThat(testDrugLine.getAfterBefore()).isEqualTo(UPDATED_AFTER_BEFORE);
        assertThat(testDrugLine.getDuration()).isEqualTo(UPDATED_DURATION);
    }

    @Test
    public void updateNonExistingDrugLine() throws Exception {
        int databaseSizeBeforeUpdate = drugLineRepository.findAll().size();

        // Create the DrugLine

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDrugLineMockMvc.perform(put("/api/drug-lines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drugLine)))
            .andExpect(status().isBadRequest());

        // Validate the DrugLine in the database
        List<DrugLine> drugLineList = drugLineRepository.findAll();
        assertThat(drugLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteDrugLine() throws Exception {
        // Initialize the database
        drugLineService.save(drugLine);

        int databaseSizeBeforeDelete = drugLineRepository.findAll().size();

        // Delete the drugLine
        restDrugLineMockMvc.perform(delete("/api/drug-lines/{id}", drugLine.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DrugLine> drugLineList = drugLineRepository.findAll();
        assertThat(drugLineList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
