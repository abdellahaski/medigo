package com.medi.go.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DrugLine.
 */
@Document(collection = "drug_line")
public class DrugLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("dose_matin")
    private Integer doseMatin;

    @Field("dose_midi")
    private Integer doseMidi;

    @Field("dose_soir")
    private Integer doseSoir;

    @Field("after_before")
    private String afterBefore;

    @Field("duration")
    private Integer duration;

    @DBRef
    @Field("drug")
    private Drug drug;

    @DBRef
    @Field("prescription")
    @JsonIgnoreProperties("drugsLines")
    private Prescription prescription;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getDoseMatin() {
        return doseMatin;
    }

    public DrugLine doseMatin(Integer doseMatin) {
        this.doseMatin = doseMatin;
        return this;
    }

    public void setDoseMatin(Integer doseMatin) {
        this.doseMatin = doseMatin;
    }

    public Integer getDoseMidi() {
        return doseMidi;
    }

    public DrugLine doseMidi(Integer doseMidi) {
        this.doseMidi = doseMidi;
        return this;
    }

    public void setDoseMidi(Integer doseMidi) {
        this.doseMidi = doseMidi;
    }

    public Integer getDoseSoir() {
        return doseSoir;
    }

    public DrugLine doseSoir(Integer doseSoir) {
        this.doseSoir = doseSoir;
        return this;
    }

    public void setDoseSoir(Integer doseSoir) {
        this.doseSoir = doseSoir;
    }

    public String getAfterBefore() {
        return afterBefore;
    }

    public DrugLine afterBefore(String afterBefore) {
        this.afterBefore = afterBefore;
        return this;
    }

    public void setAfterBefore(String afterBefore) {
        this.afterBefore = afterBefore;
    }

    public Integer getDuration() {
        return duration;
    }

    public DrugLine duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Drug getDrug() {
        return drug;
    }

    public DrugLine drug(Drug drug) {
        this.drug = drug;
        return this;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public DrugLine prescription(Prescription prescription) {
        this.prescription = prescription;
        return this;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DrugLine)) {
            return false;
        }
        return id != null && id.equals(((DrugLine) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DrugLine{" +
            "id=" + getId() +
            ", doseMatin=" + getDoseMatin() +
            ", doseMidi=" + getDoseMidi() +
            ", doseSoir=" + getDoseSoir() +
            ", afterBefore='" + getAfterBefore() + "'" +
            ", duration=" + getDuration() +
            "}";
    }
}
