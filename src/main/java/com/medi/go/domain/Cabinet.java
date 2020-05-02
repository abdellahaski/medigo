package com.medi.go.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Cabinet.
 */
@Document(collection = "cabinet")
public class Cabinet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("address")
    private String address;

    @Field("coordinates")
    private String coordinates;

    @Field("speciality")
    private String speciality;

    @DBRef
    @Field("appointements")
    private Set<Appointment> appointements = new HashSet<>();

    @DBRef
    @Field("doctors")
    private Set<MyUser> doctors = new HashSet<>();

    @DBRef
    @Field("assistants")
    private Set<MyUser> assistants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Cabinet name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Cabinet address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public Cabinet coordinates(String coordinates) {
        this.coordinates = coordinates;
        return this;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public String getSpeciality() {
        return speciality;
    }

    public Cabinet speciality(String speciality) {
        this.speciality = speciality;
        return this;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public Set<Appointment> getAppointements() {
        return appointements;
    }

    public Cabinet appointements(Set<Appointment> appointments) {
        this.appointements = appointments;
        return this;
    }

    public Cabinet addAppointements(Appointment appointment) {
        this.appointements.add(appointment);
        appointment.setCabinet(this);
        return this;
    }

    public Cabinet removeAppointements(Appointment appointment) {
        this.appointements.remove(appointment);
        appointment.setCabinet(null);
        return this;
    }

    public void setAppointements(Set<Appointment> appointments) {
        this.appointements = appointments;
    }

    public Set<MyUser> getDoctors() {
        return doctors;
    }

    public Cabinet doctors(Set<MyUser> myUsers) {
        this.doctors = myUsers;
        return this;
    }

    public Cabinet addDoctors(MyUser myUser) {
        this.doctors.add(myUser);
        myUser.setCabinet(this);
        return this;
    }

    public Cabinet removeDoctors(MyUser myUser) {
        this.doctors.remove(myUser);
        myUser.setCabinet(null);
        return this;
    }

    public void setDoctors(Set<MyUser> myUsers) {
        this.doctors = myUsers;
    }

    public Set<MyUser> getAssistants() {
        return assistants;
    }

    public Cabinet assistants(Set<MyUser> myUsers) {
        this.assistants = myUsers;
        return this;
    }

    public Cabinet addAssistants(MyUser myUser) {
        this.assistants.add(myUser);
        myUser.setCabinet(this);
        return this;
    }

    public Cabinet removeAssistants(MyUser myUser) {
        this.assistants.remove(myUser);
        myUser.setCabinet(null);
        return this;
    }

    public void setAssistants(Set<MyUser> myUsers) {
        this.assistants = myUsers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cabinet)) {
            return false;
        }
        return id != null && id.equals(((Cabinet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cabinet{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", coordinates='" + getCoordinates() + "'" +
            ", speciality='" + getSpeciality() + "'" +
            "}";
    }
}
