package com.medi.go.web.rest;

import com.medi.go.MediGoApp;
import com.medi.go.domain.Drug;
import com.medi.go.repository.DrugRepository;
import com.medi.go.service.DrugService;

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
 * Integration tests for the {@link DrugResource} REST controller.
 */
@SpringBootTest(classes = MediGoApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DrugResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VALIDATED = false;
    private static final Boolean UPDATED_VALIDATED = true;

    @Autowired
    private DrugRepository drugRepository;

    @Autowired
    private DrugService drugService;

    @Autowired
    private MockMvc restDrugMockMvc;

    private Drug drug;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Drug createEntity() {
        Drug drug = new Drug()
            .label(DEFAULT_LABEL)
            .type(DEFAULT_TYPE)
            .validated(DEFAULT_VALIDATED);
        return drug;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Drug createUpdatedEntity() {
        Drug drug = new Drug()
            .label(UPDATED_LABEL)
            .type(UPDATED_TYPE)
            .validated(UPDATED_VALIDATED);
        return drug;
    }

    @BeforeEach
    public void initTest() {
        drugRepository.deleteAll();
        drug = createEntity();
    }

    @Test
    public void createDrug() throws Exception {
        int databaseSizeBeforeCreate = drugRepository.findAll().size();

        // Create the Drug
        restDrugMockMvc.perform(post("/api/drugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drug)))
            .andExpect(status().isCreated());

        // Validate the Drug in the database
        List<Drug> drugList = drugRepository.findAll();
        assertThat(drugList).hasSize(databaseSizeBeforeCreate + 1);
        Drug testDrug = drugList.get(drugList.size() - 1);
        assertThat(testDrug.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testDrug.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testDrug.isValidated()).isEqualTo(DEFAULT_VALIDATED);
    }

    @Test
    public void createDrugWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = drugRepository.findAll().size();

        // Create the Drug with an existing ID
        drug.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restDrugMockMvc.perform(post("/api/drugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drug)))
            .andExpect(status().isBadRequest());

        // Validate the Drug in the database
        List<Drug> drugList = drugRepository.findAll();
        assertThat(drugList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllDrugs() throws Exception {
        // Initialize the database
        drugRepository.save(drug);

        // Get all the drugList
        restDrugMockMvc.perform(get("/api/drugs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(drug.getId())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].validated").value(hasItem(DEFAULT_VALIDATED.booleanValue())));
    }
    
    @Test
    public void getDrug() throws Exception {
        // Initialize the database
        drugRepository.save(drug);

        // Get the drug
        restDrugMockMvc.perform(get("/api/drugs/{id}", drug.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(drug.getId()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.validated").value(DEFAULT_VALIDATED.booleanValue()));
    }

    @Test
    public void getNonExistingDrug() throws Exception {
        // Get the drug
        restDrugMockMvc.perform(get("/api/drugs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDrug() throws Exception {
        // Initialize the database
        drugService.save(drug);

        int databaseSizeBeforeUpdate = drugRepository.findAll().size();

        // Update the drug
        Drug updatedDrug = drugRepository.findById(drug.getId()).get();
        updatedDrug
            .label(UPDATED_LABEL)
            .type(UPDATED_TYPE)
            .validated(UPDATED_VALIDATED);

        restDrugMockMvc.perform(put("/api/drugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDrug)))
            .andExpect(status().isOk());

        // Validate the Drug in the database
        List<Drug> drugList = drugRepository.findAll();
        assertThat(drugList).hasSize(databaseSizeBeforeUpdate);
        Drug testDrug = drugList.get(drugList.size() - 1);
        assertThat(testDrug.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testDrug.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testDrug.isValidated()).isEqualTo(UPDATED_VALIDATED);
    }

    @Test
    public void updateNonExistingDrug() throws Exception {
        int databaseSizeBeforeUpdate = drugRepository.findAll().size();

        // Create the Drug

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDrugMockMvc.perform(put("/api/drugs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(drug)))
            .andExpect(status().isBadRequest());

        // Validate the Drug in the database
        List<Drug> drugList = drugRepository.findAll();
        assertThat(drugList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteDrug() throws Exception {
        // Initialize the database
        drugService.save(drug);

        int databaseSizeBeforeDelete = drugRepository.findAll().size();

        // Delete the drug
        restDrugMockMvc.perform(delete("/api/drugs/{id}", drug.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Drug> drugList = drugRepository.findAll();
        assertThat(drugList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
