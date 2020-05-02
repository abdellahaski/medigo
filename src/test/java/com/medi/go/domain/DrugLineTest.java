package com.medi.go.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.medi.go.web.rest.TestUtil;

public class DrugLineTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DrugLine.class);
        DrugLine drugLine1 = new DrugLine();
        drugLine1.setId("id1");
        DrugLine drugLine2 = new DrugLine();
        drugLine2.setId(drugLine1.getId());
        assertThat(drugLine1).isEqualTo(drugLine2);
        drugLine2.setId("id2");
        assertThat(drugLine1).isNotEqualTo(drugLine2);
        drugLine1.setId(null);
        assertThat(drugLine1).isNotEqualTo(drugLine2);
    }
}
