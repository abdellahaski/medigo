package com.medi.go.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.medi.go.web.rest.TestUtil;

public class DrugTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Drug.class);
        Drug drug1 = new Drug();
        drug1.setId("id1");
        Drug drug2 = new Drug();
        drug2.setId(drug1.getId());
        assertThat(drug1).isEqualTo(drug2);
        drug2.setId("id2");
        assertThat(drug1).isNotEqualTo(drug2);
        drug1.setId(null);
        assertThat(drug1).isNotEqualTo(drug2);
    }
}
