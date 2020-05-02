package com.medi.go.web.rest;

import com.medi.go.MediGoApp;
import com.medi.go.domain.Consultation;
import com.medi.go.repository.ConsultationRepository;
import com.medi.go.service.ConsultationService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ConsultationResource} REST controller.
 */
@SpringBootTest(classes = MediGoApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ConsultationResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_COST = new BigDecimal(1);
    private static final BigDecimal UPDATED_COST = new BigDecimal(2);

    private static final BigDecimal DEFAULT_ADVANCE = new BigDecimal(1);
    private static final BigDecimal UPDATED_ADVANCE = new BigDecimal(2);

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private ConsultationService consultationService;

    @Autowired
    private MockMvc restConsultationMockMvc;

    private Consultation consultation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consultation createEntity() {
        Consultation consultation = new Consultation()
            .type(DEFAULT_TYPE)
            .cost(DEFAULT_COST)
            .advance(DEFAULT_ADVANCE);
        return consultation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consultation createUpdatedEntity() {
        Consultation consultation = new Consultation()
            .type(UPDATED_TYPE)
            .cost(UPDATED_COST)
            .advance(UPDATED_ADVANCE);
        return consultation;
    }

    @BeforeEach
    public void initTest() {
        consultationRepository.deleteAll();
        consultation = createEntity();
    }

    @Test
    public void createConsultation() throws Exception {
        int databaseSizeBeforeCreate = consultationRepository.findAll().size();

        // Create the Consultation
        restConsultationMockMvc.perform(post("/api/consultations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultation)))
            .andExpect(status().isCreated());

        // Validate the Consultation in the database
        List<Consultation> consultationList = consultationRepository.findAll();
        assertThat(consultationList).hasSize(databaseSizeBeforeCreate + 1);
        Consultation testConsultation = consultationList.get(consultationList.size() - 1);
        assertThat(testConsultation.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testConsultation.getCost()).isEqualTo(DEFAULT_COST);
        assertThat(testConsultation.getAdvance()).isEqualTo(DEFAULT_ADVANCE);
    }

    @Test
    public void createConsultationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consultationRepository.findAll().size();

        // Create the Consultation with an existing ID
        consultation.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsultationMockMvc.perform(post("/api/consultations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultation)))
            .andExpect(status().isBadRequest());

        // Validate the Consultation in the database
        List<Consultation> consultationList = consultationRepository.findAll();
        assertThat(consultationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllConsultations() throws Exception {
        // Initialize the database
        consultationRepository.save(consultation);

        // Get all the consultationList
        restConsultationMockMvc.perform(get("/api/consultations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consultation.getId())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST.intValue())))
            .andExpect(jsonPath("$.[*].advance").value(hasItem(DEFAULT_ADVANCE.intValue())));
    }
    
    @Test
    public void getConsultation() throws Exception {
        // Initialize the database
        consultationRepository.save(consultation);

        // Get the consultation
        restConsultationMockMvc.perform(get("/api/consultations/{id}", consultation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(consultation.getId()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST.intValue()))
            .andExpect(jsonPath("$.advance").value(DEFAULT_ADVANCE.intValue()));
    }

    @Test
    public void getNonExistingConsultation() throws Exception {
        // Get the consultation
        restConsultationMockMvc.perform(get("/api/consultations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateConsultation() throws Exception {
        // Initialize the database
        consultationService.save(consultation);

        int databaseSizeBeforeUpdate = consultationRepository.findAll().size();

        // Update the consultation
        Consultation updatedConsultation = consultationRepository.findById(consultation.getId()).get();
        updatedConsultation
            .type(UPDATED_TYPE)
            .cost(UPDATED_COST)
            .advance(UPDATED_ADVANCE);

        restConsultationMockMvc.perform(put("/api/consultations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsultation)))
            .andExpect(status().isOk());

        // Validate the Consultation in the database
        List<Consultation> consultationList = consultationRepository.findAll();
        assertThat(consultationList).hasSize(databaseSizeBeforeUpdate);
        Consultation testConsultation = consultationList.get(consultationList.size() - 1);
        assertThat(testConsultation.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testConsultation.getCost()).isEqualTo(UPDATED_COST);
        assertThat(testConsultation.getAdvance()).isEqualTo(UPDATED_ADVANCE);
    }

    @Test
    public void updateNonExistingConsultation() throws Exception {
        int databaseSizeBeforeUpdate = consultationRepository.findAll().size();

        // Create the Consultation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsultationMockMvc.perform(put("/api/consultations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultation)))
            .andExpect(status().isBadRequest());

        // Validate the Consultation in the database
        List<Consultation> consultationList = consultationRepository.findAll();
        assertThat(consultationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteConsultation() throws Exception {
        // Initialize the database
        consultationService.save(consultation);

        int databaseSizeBeforeDelete = consultationRepository.findAll().size();

        // Delete the consultation
        restConsultationMockMvc.perform(delete("/api/consultations/{id}", consultation.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Consultation> consultationList = consultationRepository.findAll();
        assertThat(consultationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
