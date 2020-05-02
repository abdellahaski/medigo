package com.medi.go.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.medi.go.web.rest.TestUtil;

public class CustomLineTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomLine.class);
        CustomLine customLine1 = new CustomLine();
        customLine1.setId("id1");
        CustomLine customLine2 = new CustomLine();
        customLine2.setId(customLine1.getId());
        assertThat(customLine1).isEqualTo(customLine2);
        customLine2.setId("id2");
        assertThat(customLine1).isNotEqualTo(customLine2);
        customLine1.setId(null);
        assertThat(customLine1).isNotEqualTo(customLine2);
    }
}
