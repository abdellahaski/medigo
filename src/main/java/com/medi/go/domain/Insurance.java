package com.medi.go.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Insurance.
 */
@Document(collection = "insurance")
public class Insurance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("company")
    private String company;

    @Field("affiliation_number")
    private String affiliationNumber;

    @DBRef
    @Field("consultation")
    @JsonIgnoreProperties("insurances")
    private Consultation consultation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public Insurance company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getAffiliationNumber() {
        return affiliationNumber;
    }

    public Insurance affiliationNumber(String affiliationNumber) {
        this.affiliationNumber = affiliationNumber;
        return this;
    }

    public void setAffiliationNumber(String affiliationNumber) {
        this.affiliationNumber = affiliationNumber;
    }

    public Consultation getConsultation() {
        return consultation;
    }

    public Insurance consultation(Consultation consultation) {
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
        if (!(o instanceof Insurance)) {
            return false;
        }
        return id != null && id.equals(((Insurance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Insurance{" +
            "id=" + getId() +
            ", company='" + getCompany() + "'" +
            ", affiliationNumber='" + getAffiliationNumber() + "'" +
            "}";
    }
}
