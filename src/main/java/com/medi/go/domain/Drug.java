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
 * A Drug.
 */
@Document(collection = "drug")
public class Drug implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("label")
    private String label;

    @Field("type")
    private String type;

    @Field("validated")
    private Boolean validated;

    @DBRef
    @Field("cabinetIds")
    private Set<OneString> cabinetIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Drug label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getType() {
        return type;
    }

    public Drug type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean isValidated() {
        return validated;
    }

    public Drug validated(Boolean validated) {
        this.validated = validated;
        return this;
    }

    public void setValidated(Boolean validated) {
        this.validated = validated;
    }

    public Set<OneString> getCabinetIds() {
        return cabinetIds;
    }

    public Drug cabinetIds(Set<OneString> oneStrings) {
        this.cabinetIds = oneStrings;
        return this;
    }

    public Drug addCabinetIds(OneString oneString) {
        this.cabinetIds.add(oneString);
        oneString.setDrug(this);
        return this;
    }

    public Drug removeCabinetIds(OneString oneString) {
        this.cabinetIds.remove(oneString);
        oneString.setDrug(null);
        return this;
    }

    public void setCabinetIds(Set<OneString> oneStrings) {
        this.cabinetIds = oneStrings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Drug)) {
            return false;
        }
        return id != null && id.equals(((Drug) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Drug{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", type='" + getType() + "'" +
            ", validated='" + isValidated() + "'" +
            "}";
    }
}
