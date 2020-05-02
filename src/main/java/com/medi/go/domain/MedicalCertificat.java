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
 * A MedicalCertificat.
 */
@Document(collection = "medical_certificat")
public class MedicalCertificat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("date")
    private ZonedDateTime date;

    @Field("start_date")
    private ZonedDateTime startDate;

    @Field("end_date")
    private ZonedDateTime endDate;

    @Field("days")
    private Integer days;

    @Field("url_id")
    private String urlId;

    @DBRef
    @Field("consultation")
    @JsonIgnoreProperties("medicalCertificats")
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

    public MedicalCertificat date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public MedicalCertificat startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public MedicalCertificat endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public Integer getDays() {
        return days;
    }

    public MedicalCertificat days(Integer days) {
        this.days = days;
        return this;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public String getUrlId() {
        return urlId;
    }

    public MedicalCertificat urlId(String urlId) {
        this.urlId = urlId;
        return this;
    }

    public void setUrlId(String urlId) {
        this.urlId = urlId;
    }

    public Consultation getConsultation() {
        return consultation;
    }

    public MedicalCertificat consultation(Consultation consultation) {
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
        if (!(o instanceof MedicalCertificat)) {
            return false;
        }
        return id != null && id.equals(((MedicalCertificat) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MedicalCertificat{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", days=" + getDays() +
            ", urlId='" + getUrlId() + "'" +
            "}";
    }
}
