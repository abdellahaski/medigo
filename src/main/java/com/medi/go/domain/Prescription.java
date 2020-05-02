package com.medi.go.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Prescription.
 */
@Document(collection = "prescription")
public class Prescription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("date")
    private ZonedDateTime date;

    @DBRef
    @Field("drugsLines")
    private Set<DrugLine> drugsLines = new HashSet<>();

    @DBRef
    @Field("customLines")
    private Set<CustomLine> customLines = new HashSet<>();

    @DBRef
    @Field("consultation")
    @JsonIgnoreProperties("prescriptions")
    private Consultation consultation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Prescription date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Set<DrugLine> getDrugsLines() {
        return drugsLines;
    }

    public Prescription drugsLines(Set<DrugLine> drugLines) {
        this.drugsLines = drugLines;
        return this;
    }

    public Prescription addDrugsLines(DrugLine drugLine) {
        this.drugsLines.add(drugLine);
        drugLine.setPrescription(this);
        return this;
    }

    public Prescription removeDrugsLines(DrugLine drugLine) {
        this.drugsLines.remove(drugLine);
        drugLine.setPrescription(null);
        return this;
    }

    public void setDrugsLines(Set<DrugLine> drugLines) {
        this.drugsLines = drugLines;
    }

    public Set<CustomLine> getCustomLines() {
        return customLines;
    }

    public Prescription customLines(Set<CustomLine> customLines) {
        this.customLines = customLines;
        return this;
    }

    public Prescription addCustomLines(CustomLine customLine) {
        this.customLines.add(customLine);
        customLine.setPrescription(this);
        return this;
    }

    public Prescription removeCustomLines(CustomLine customLine) {
        this.customLines.remove(customLine);
        customLine.setPrescription(null);
        return this;
    }

    public void setCustomLines(Set<CustomLine> customLines) {
        this.customLines = customLines;
    }

    public Consultation getConsultation() {
        return consultation;
    }

    public Prescription consultation(Consultation consultation) {
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
        if (!(o instanceof Prescription)) {
            return false;
        }
        return id != null && id.equals(((Prescription) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Prescription{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
