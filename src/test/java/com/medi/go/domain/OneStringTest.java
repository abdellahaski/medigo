package com.medi.go.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.medi.go.web.rest.TestUtil;

public class OneStringTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OneString.class);
        OneString oneString1 = new OneString();
        oneString1.setId("id1");
        OneString oneString2 = new OneString();
        oneString2.setId(oneString1.getId());
        assertThat(oneString1).isEqualTo(oneString2);
        oneString2.setId("id2");
        assertThat(oneString1).isNotEqualTo(oneString2);
        oneString1.setId(null);
        assertThat(oneString1).isNotEqualTo(oneString2);
    }
}
