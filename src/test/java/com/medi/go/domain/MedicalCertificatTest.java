package com.medi.go.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.medi.go.web.rest.TestUtil;

public class MedicalCertificatTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedicalCertificat.class);
        MedicalCertificat medicalCertificat1 = new MedicalCertificat();
        medicalCertificat1.setId("id1");
        MedicalCertificat medicalCertificat2 = new MedicalCertificat();
        medicalCertificat2.setId(medicalCertificat1.getId());
        assertThat(medicalCertificat1).isEqualTo(medicalCertificat2);
        medicalCertificat2.setId("id2");
        assertThat(medicalCertificat1).isNotEqualTo(medicalCertificat2);
        medicalCertificat1.setId(null);
        assertThat(medicalCertificat1).isNotEqualTo(medicalCertificat2);
    }
}
