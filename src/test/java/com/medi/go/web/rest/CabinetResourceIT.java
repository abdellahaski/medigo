package com.medi.go.web.rest;

import com.medi.go.MediGoApp;
import com.medi.go.domain.Cabinet;
import com.medi.go.repository.CabinetRepository;
import com.medi.go.service.CabinetService;

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
 * Integration tests for the {@link CabinetResource} REST controller.
 */
@SpringBootTest(classes = MediGoApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class CabinetResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_COORDINATES = "AAAAAAAAAA";
    private static final String UPDATED_COORDINATES = "BBBBBBBBBB";

    private static final String DEFAULT_SPECIALITY = "AAAAAAAAAA";
    private static final String UPDATED_SPECIALITY = "BBBBBBBBBB";

    @Autowired
    private CabinetRepository cabinetRepository;

    @Autowired
    private CabinetService cabinetService;

    @Autowired
    private MockMvc restCabinetMockMvc;

    private Cabinet cabinet;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cabinet createEntity() {
        Cabinet cabinet = new Cabinet()
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS)
            .coordinates(DEFAULT_COORDINATES)
            .speciality(DEFAULT_SPECIALITY);
        return cabinet;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cabinet createUpdatedEntity() {
        Cabinet cabinet = new Cabinet()
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .coordinates(UPDATED_COORDINATES)
            .speciality(UPDATED_SPECIALITY);
        return cabinet;
    }

    @BeforeEach
    public void initTest() {
        cabinetRepository.deleteAll();
        cabinet = createEntity();
    }

    @Test
    public void createCabinet() throws Exception {
        int databaseSizeBeforeCreate = cabinetRepository.findAll().size();

        // Create the Cabinet
        restCabinetMockMvc.perform(post("/api/cabinets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cabinet)))
            .andExpect(status().isCreated());

        // Validate the Cabinet in the database
        List<Cabinet> cabinetList = cabinetRepository.findAll();
        assertThat(cabinetList).hasSize(databaseSizeBeforeCreate + 1);
        Cabinet testCabinet = cabinetList.get(cabinetList.size() - 1);
        assertThat(testCabinet.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCabinet.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testCabinet.getCoordinates()).isEqualTo(DEFAULT_COORDINATES);
        assertThat(testCabinet.getSpeciality()).isEqualTo(DEFAULT_SPECIALITY);
    }

    @Test
    public void createCabinetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cabinetRepository.findAll().size();

        // Create the Cabinet with an existing ID
        cabinet.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCabinetMockMvc.perform(post("/api/cabinets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cabinet)))
            .andExpect(status().isBadRequest());

        // Validate the Cabinet in the database
        List<Cabinet> cabinetList = cabinetRepository.findAll();
        assertThat(cabinetList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllCabinets() throws Exception {
        // Initialize the database
        cabinetRepository.save(cabinet);

        // Get all the cabinetList
        restCabinetMockMvc.perform(get("/api/cabinets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cabinet.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].coordinates").value(hasItem(DEFAULT_COORDINATES)))
            .andExpect(jsonPath("$.[*].speciality").value(hasItem(DEFAULT_SPECIALITY)));
    }
    
    @Test
    public void getCabinet() throws Exception {
        // Initialize the database
        cabinetRepository.save(cabinet);

        // Get the cabinet
        restCabinetMockMvc.perform(get("/api/cabinets/{id}", cabinet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cabinet.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.coordinates").value(DEFAULT_COORDINATES))
            .andExpect(jsonPath("$.speciality").value(DEFAULT_SPECIALITY));
    }

    @Test
    public void getNonExistingCabinet() throws Exception {
        // Get the cabinet
        restCabinetMockMvc.perform(get("/api/cabinets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCabinet() throws Exception {
        // Initialize the database
        cabinetService.save(cabinet);

        int databaseSizeBeforeUpdate = cabinetRepository.findAll().size();

        // Update the cabinet
        Cabinet updatedCabinet = cabinetRepository.findById(cabinet.getId()).get();
        updatedCabinet
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .coordinates(UPDATED_COORDINATES)
            .speciality(UPDATED_SPECIALITY);

        restCabinetMockMvc.perform(put("/api/cabinets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCabinet)))
            .andExpect(status().isOk());

        // Validate the Cabinet in the database
        List<Cabinet> cabinetList = cabinetRepository.findAll();
        assertThat(cabinetList).hasSize(databaseSizeBeforeUpdate);
        Cabinet testCabinet = cabinetList.get(cabinetList.size() - 1);
        assertThat(testCabinet.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCabinet.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testCabinet.getCoordinates()).isEqualTo(UPDATED_COORDINATES);
        assertThat(testCabinet.getSpeciality()).isEqualTo(UPDATED_SPECIALITY);
    }

    @Test
    public void updateNonExistingCabinet() throws Exception {
        int databaseSizeBeforeUpdate = cabinetRepository.findAll().size();

        // Create the Cabinet

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCabinetMockMvc.perform(put("/api/cabinets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cabinet)))
            .andExpect(status().isBadRequest());

        // Validate the Cabinet in the database
        List<Cabinet> cabinetList = cabinetRepository.findAll();
        assertThat(cabinetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCabinet() throws Exception {
        // Initialize the database
        cabinetService.save(cabinet);

        int databaseSizeBeforeDelete = cabinetRepository.findAll().size();

        // Delete the cabinet
        restCabinetMockMvc.perform(delete("/api/cabinets/{id}", cabinet.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cabinet> cabinetList = cabinetRepository.findAll();
        assertThat(cabinetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
