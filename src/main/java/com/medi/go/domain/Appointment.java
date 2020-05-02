package com.medi.go.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;

/**
 * A Appointment.
 */
@Document(collection = "appointment")
public class Appointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("date_time")
    private ZonedDateTime dateTime;

    @Field("notes")
    private String notes;

    @DBRef
    @Field("patient")
    @JsonIgnoreProperties("appointements")
    private MyUser patient;

    @DBRef
    @Field("cabinet")
    @JsonIgnoreProperties("appointements")
    private Cabinet cabinet;

    @DBRef
    @Field("consultation")
    @JsonIgnoreProperties("appointements")
    private Consultation consultation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ZonedDateTime getDateTime() {
        return dateTime;
    }

    public Appointment dateTime(ZonedDateTime dateTime) {
        this.dateTime = dateTime;
        return this;
    }

    public void setDateTime(ZonedDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getNotes() {
        return notes;
    }

    public Appointment notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public MyUser getPatient() {
        return patient;
    }

    public Appointment patient(MyUser myUser) {
        this.patient = myUser;
        return this;
    }

    public void setPatient(MyUser myUser) {
        this.patient = myUser;
    }

    public Cabinet getCabinet() {
        return cabinet;
    }

    public Appointment cabinet(Cabinet cabinet) {
        this.cabinet = cabinet;
        return this;
    }

    public void setCabinet(Cabinet cabinet) {
        this.cabinet = cabinet;
    }

    public Consultation getConsultation() {
        return consultation;
    }

    public Appointment consultation(Consultation consultation) {
        this.consultation = consultation;
        return this;
    }

    public void setConsultation(Consultation consultation) {
        this.consultation = consultation;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Appointment)) {
            return false;
        }
        return id != null && id.equals(((Appointment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Appointment{" +
            "id=" + getId() +
            ", dateTime='" + getDateTime() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
