package com.medi.go.service;

import com.medi.go.domain.Appointment;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Appointment}.
 */
public interface AppointmentService {

    /**
     * Save a appointment.
     *
     * @param appointment the entity to save.
     * @return the persisted entity.
     */
    Appointment save(Appointment appointment);

    /**
     * Get all the appointments.
     *
     * @return the list of entities.
     */
    List<Appointment> findAll();

    /**
     * Get the "id" appointment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Appointment> findOne(String id);

    /**
     * Delete the "id" appointment.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
