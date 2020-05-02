package com.medi.go.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A MyUser.
 */
@Document(collection = "my_user")
public class MyUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("username")
    private String username;

    @Field("password")
    private String password;

    @Field("email")
    private String email;

    @Field("active")
    private Boolean active;

    @Field("first_name")
    private String firstName;

    @Field("last_name")
    private String lastName;

    @Field("cin")
    private String cin;

    @Field("type")
    private String type;

    @Field("current_insurance")
    private String currentInsurance;

    @DBRef
    @Field("appointements")
    private Set<Appointment> appointements = new HashSet<>();

    @DBRef
    @Field("consultations")
    private Set<Consultation> consultations = new HashSet<>();

    @DBRef
    @Field("cabinet")
    @JsonIgnoreProperties("doctors")
    private Cabinet cabinet;

    @DBRef
    @Field("cabinet")
    @JsonIgnoreProperties("doctors")
    private Cabinet cabinet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public MyUser username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public MyUser password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public MyUser email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isActive() {
        return active;
    }

    public MyUser active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getFirstName() {
        return firstName;
    }

    public MyUser firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public MyUser lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCin() {
        return cin;
    }

    public MyUser cin(String cin) {
        this.cin = cin;
        return this;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getType() {
        return type;
    }

    public MyUser type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCurrentInsurance() {
        return currentInsurance;
    }

    public MyUser currentInsurance(String currentInsurance) {
        this.currentInsurance = currentInsurance;
        return this;
    }

    public void setCurrentInsurance(String currentInsurance) {
        this.currentInsurance = currentInsurance;
    }

    public Set<Appointment> getAppointements() {
        return appointements;
    }

    public MyUser appointements(Set<Appointment> appointments) {
        this.appointements = appointments;
        return this;
    }

    public MyUser addAppointements(Appointment appointment) {
        this.appointements.add(appointment);
        appointment.setPatient(this);
        return this;
    }

    public MyUser removeAppointements(Appointment appointment) {
        this.appointements.remove(appointment);
        appointment.setPatient(null);
        return this;
    }

    public void setAppointements(Set<Appointment> appointments) {
        this.appointements = appointments;
    }

    public Set<Consultation> getConsultations() {
        return consultations;
    }

    public MyUser consultations(Set<Consultation> consultations) {
        this.consultations = consultations;
        return this;
    }

    public MyUser addConsultations(Consultation consultation) {
        this.consultations.add(consultation);
        consultation.setDoctor(this);
        return this;
    }

    public MyUser removeConsultations(Consultation consultation) {
        this.consultations.remove(consultation);
        consultation.setDoctor(null);
        return this;
    }

    public void setConsultations(Set<Consultation> consultations) {
        this.consultations = consultations;
    }

    public Cabinet getCabinet() {
        return cabinet;
    }

    public MyUser cabinet(Cabinet cabinet) {
        this.cabinet = cabinet;
        return this;
    }

    public void setCabinet(Cabinet cabinet) {
        this.cabinet = cabinet;
    }

    public Cabinet getCabinet() {
        return cabinet;
    }

    public MyUser cabinet(Cabinet cabinet) {
        this.cabinet = cabinet;
        return this;
    }

    public void setCabinet(Cabinet cabinet) {
        this.cabinet = cabinet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MyUser)) {
            return false;
        }
        return id != null && id.equals(((MyUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MyUser{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            ", email='" + getEmail() + "'" +
            ", active='" + isActive() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", cin='" + getCin() + "'" +
            ", type='" + getType() + "'" +
            ", currentInsurance='" + getCurrentInsurance() + "'" +
            "}";
    }
}
