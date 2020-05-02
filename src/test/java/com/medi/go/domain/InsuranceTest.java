package com.medi.go.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.medi.go.web.rest.TestUtil;

public class InsuranceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Insurance.class);
        Insurance insurance1 = new Insurance();
        insurance1.setId("id1");
        Insurance insurance2 = new Insurance();
        insurance2.setId(insurance1.getId());
        assertThat(insurance1).isEqualTo(insurance2);
        insurance2.setId("id2");
        assertThat(insurance1).isNotEqualTo(insurance2);
        insurance1.setId(null);
        assertThat(insurance1).isNotEqualTo(insurance2);
    }
}
