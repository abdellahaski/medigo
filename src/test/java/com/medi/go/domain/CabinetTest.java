package com.medi.go.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.medi.go.web.rest.TestUtil;

public class CabinetTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cabinet.class);
        Cabinet cabinet1 = new Cabinet();
        cabinet1.setId("id1");
        Cabinet cabinet2 = new Cabinet();
        cabinet2.setId(cabinet1.getId());
        assertThat(cabinet1).isEqualTo(cabinet2);
        cabinet2.setId("id2");
        assertThat(cabinet1).isNotEqualTo(cabinet2);
        cabinet1.setId(null);
        assertThat(cabinet1).isNotEqualTo(cabinet2);
    }
}
