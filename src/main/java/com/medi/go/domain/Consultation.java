package com.medi.go.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * A Consultation.
 */
@Document(collection = "consultation")
public class Consultation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("type")
    private String type;

    @Field("cost")
    private BigDecimal cost;

    @Field("advance")
    private BigDecimal advance;

    @DBRef
    @Field("medicalCertificats")
    private Set<MedicalCertificat> medicalCertificats = new HashSet<>();

    @DBRef
    @Field("appointements")
    private Set<Appointment> appointements = new HashSet<>();

    @DBRef
    @Field("prescriptions")
    private Set<Prescription> prescriptions = new HashSet<>();

    @DBRef
    @Field("insurances")
    private Set<Insurance> insurances = new HashSet<>();

    @DBRef
    @Field("doctor")
    @JsonIgnoreProperties("consultations")
    private MyUser doctor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Consultation type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public Consultation cost(BigDecimal cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public BigDecimal getAdvance() {
        return advance;
    }

    public Consultation advance(BigDecimal advance) {
        this.advance = advance;
        return this;
    }

    public void setAdvance(BigDecimal advance) {
        this.advance = advance;
    }

    public Set<MedicalCertificat> getMedicalCertificats() {
        return medicalCertificats;
    }

    public Consultation medicalCertificats(Set<MedicalCertificat> medicalCertificats) {
        this.medicalCertificats = medicalCertificats;
        return this;
    }

    public Consultation addMedicalCertificats(MedicalCertificat medicalCertificat) {
        this.medicalCertificats.add(medicalCertificat);
        medicalCertificat.setConsultation(this);
        return this;
    }

    public Consultation removeMedicalCertificats(MedicalCertificat medicalCertificat) {
        this.medicalCertificats.remove(medicalCertificat);
        medicalCertificat.setConsultation(null);
        return this;
    }

    public void setMedicalCertificats(Set<MedicalCertificat> medicalCertificats) {
        this.medicalCertificats = medicalCertificats;
    }

    public Set<Appointment> getAppointements() {
        return appointements;
    }

    public Consultation appointements(Set<Appointment> appointments) {
        this.appointements = appointments;
        return this;
    }

    public Consultation addAppointements(Appointment appointment) {
        this.appointements.add(appointment);
        appointment.setConsultation(this);
        return this;
    }

    public Consultation removeAppointements(Appointment appointment) {
        this.appointements.remove(appointment);
        appointment.setConsultation(null);
        return this;
    }

    public void setAppointements(Set<Appointment> appointments) {
        this.appointements = appointments;
    }

    public Set<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public Consultation prescriptions(Set<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
        return this;
    }

    public Consultation addPrescriptions(Prescription prescription) {
        this.prescriptions.add(prescription);
        prescription.setConsultation(this);
        return this;
    }

    public Consultation removePrescriptions(Prescription prescription) {
        this.prescriptions.remove(prescription);
        prescription.setConsultation(null);
        return this;
    }

    public void setPrescriptions(Set<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public Set<Insurance> getInsurances() {
        return insurances;
    }

    public Consultation insurances(Set<Insurance> insurances) {
        this.insurances = insurances;
        return this;
    }

    public Consultation addInsurances(Insurance insurance) {
        this.insurances.add(insurance);
        insurance.setConsultation(this);
        return this;
    }

    public Consultation removeInsurances(Insurance insurance) {
        this.insurances.remove(insurance);
        insurance.setConsultation(null);
        return this;
    }

    public void setInsurances(Set<Insurance> insurances) {
        this.insurances = insurances;
    }

    public MyUser getDoctor() {
        return doctor;
    }

    public Consultation doctor(MyUser myUser) {
        this.doctor = myUser;
        return this;
    }

    public void setDoctor(MyUser myUser) {
        this.doctor = myUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Consultation)) {
            return false;
        }
        return id != null && id.equals(((Consultation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Consultation{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", cost=" + getCost() +
            ", advance=" + getAdvance() +
            "}";
    }
}
