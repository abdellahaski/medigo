package com.medi.go.web.rest;

import com.medi.go.MediGoApp;
import com.medi.go.domain.MedicalCertificat;
import com.medi.go.repository.MedicalCertificatRepository;
import com.medi.go.service.MedicalCertificatService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.medi.go.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MedicalCertificatResource} REST controller.
 */
@SpringBootTest(classes = MediGoApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MedicalCertificatResourceIT {

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_DAYS = 1;
    private static final Integer UPDATED_DAYS = 2;

    private static final String DEFAULT_URL_ID = "AAAAAAAAAA";
    private static final String UPDATED_URL_ID = "BBBBBBBBBB";

    @Autowired
    private MedicalCertificatRepository medicalCertificatRepository;

    @Autowired
    private MedicalCertificatService medicalCertificatService;

    @Autowired
    private MockMvc restMedicalCertificatMockMvc;

    private MedicalCertificat medicalCertificat;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedicalCertificat createEntity() {
        MedicalCertificat medicalCertificat = new MedicalCertificat()
            .date(DEFAULT_DATE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .days(DEFAULT_DAYS)
            .urlId(DEFAULT_URL_ID);
        return medicalCertificat;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedicalCertificat createUpdatedEntity() {
        MedicalCertificat medicalCertificat = new MedicalCertificat()
            .date(UPDATED_DATE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .days(UPDATED_DAYS)
            .urlId(UPDATED_URL_ID);
        return medicalCertificat;
    }

    @BeforeEach
    public void initTest() {
        medicalCertificatRepository.deleteAll();
        medicalCertificat = createEntity();
    }

    @Test
    public void createMedicalCertificat() throws Exception {
        int databaseSizeBeforeCreate = medicalCertificatRepository.findAll().size();

        // Create the MedicalCertificat
        restMedicalCertificatMockMvc.perform(post("/api/medical-certificats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicalCertificat)))
            .andExpect(status().isCreated());

        // Validate the MedicalCertificat in the database
        List<MedicalCertificat> medicalCertificatList = medicalCertificatRepository.findAll();
        assertThat(medicalCertificatList).hasSize(databaseSizeBeforeCreate + 1);
        MedicalCertificat testMedicalCertificat = medicalCertificatList.get(medicalCertificatList.size() - 1);
        assertThat(testMedicalCertificat.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testMedicalCertificat.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testMedicalCertificat.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testMedicalCertificat.getDays()).isEqualTo(DEFAULT_DAYS);
        assertThat(testMedicalCertificat.getUrlId()).isEqualTo(DEFAULT_URL_ID);
    }

    @Test
    public void createMedicalCertificatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicalCertificatRepository.findAll().size();

        // Create the MedicalCertificat with an existing ID
        medicalCertificat.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicalCertificatMockMvc.perform(post("/api/medical-certificats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicalCertificat)))
            .andExpect(status().isBadRequest());

        // Validate the MedicalCertificat in the database
        List<MedicalCertificat> medicalCertificatList = medicalCertificatRepository.findAll();
        assertThat(medicalCertificatList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllMedicalCertificats() throws Exception {
        // Initialize the database
        medicalCertificatRepository.save(medicalCertificat);

        // Get all the medicalCertificatList
        restMedicalCertificatMockMvc.perform(get("/api/medical-certificats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medicalCertificat.getId())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(sameInstant(DEFAULT_START_DATE))))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(sameInstant(DEFAULT_END_DATE))))
            .andExpect(jsonPath("$.[*].days").value(hasItem(DEFAULT_DAYS)))
            .andExpect(jsonPath("$.[*].urlId").value(hasItem(DEFAULT_URL_ID)));
    }
    
    @Test
    public void getMedicalCertificat() throws Exception {
        // Initialize the database
        medicalCertificatRepository.save(medicalCertificat);

        // Get the medicalCertificat
        restMedicalCertificatMockMvc.perform(get("/api/medical-certificats/{id}", medicalCertificat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medicalCertificat.getId()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.startDate").value(sameInstant(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.endDate").value(sameInstant(DEFAULT_END_DATE)))
            .andExpect(jsonPath("$.days").value(DEFAULT_DAYS))
            .andExpect(jsonPath("$.urlId").value(DEFAULT_URL_ID));
    }

    @Test
    public void getNonExistingMedicalCertificat() throws Exception {
        // Get the medicalCertificat
        restMedicalCertificatMockMvc.perform(get("/api/medical-certificats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMedicalCertificat() throws Exception {
        // Initialize the database
        medicalCertificatService.save(medicalCertificat);

        int databaseSizeBeforeUpdate = medicalCertificatRepository.findAll().size();

        // Update the medicalCertificat
        MedicalCertificat updatedMedicalCertificat = medicalCertificatRepository.findById(medicalCertificat.getId()).get();
        updatedMedicalCertificat
            .date(UPDATED_DATE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .days(UPDATED_DAYS)
            .urlId(UPDATED_URL_ID);

        restMedicalCertificatMockMvc.perform(put("/api/medical-certificats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedicalCertificat)))
            .andExpect(status().isOk());

        // Validate the MedicalCertificat in the database
        List<MedicalCertificat> medicalCertificatList = medicalCertificatRepository.findAll();
        assertThat(medicalCertificatList).hasSize(databaseSizeBeforeUpdate);
        MedicalCertificat testMedicalCertificat = medicalCertificatList.get(medicalCertificatList.size() - 1);
        assertThat(testMedicalCertificat.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testMedicalCertificat.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testMedicalCertificat.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testMedicalCertificat.getDays()).isEqualTo(UPDATED_DAYS);
        assertThat(testMedicalCertificat.getUrlId()).isEqualTo(UPDATED_URL_ID);
    }

    @Test
    public void updateNonExistingMedicalCertificat() throws Exception {
        int databaseSizeBeforeUpdate = medicalCertificatRepository.findAll().size();

        // Create the MedicalCertificat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedicalCertificatMockMvc.perform(put("/api/medical-certificats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicalCertificat)))
            .andExpect(status().isBadRequest());

        // Validate the MedicalCertificat in the database
        List<MedicalCertificat> medicalCertificatList = medicalCertificatRepository.findAll();
        assertThat(medicalCertificatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMedicalCertificat() throws Exception {
        // Initialize the database
        medicalCertificatService.save(medicalCertificat);

        int databaseSizeBeforeDelete = medicalCertificatRepository.findAll().size();

        // Delete the medicalCertificat
        restMedicalCertificatMockMvc.perform(delete("/api/medical-certificats/{id}", medicalCertificat.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedicalCertificat> medicalCertificatList = medicalCertificatRepository.findAll();
        assertThat(medicalCertificatList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
