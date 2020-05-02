package com.medi.go.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.medi.go.web.rest.TestUtil;

public class MyUserTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MyUser.class);
        MyUser myUser1 = new MyUser();
        myUser1.setId("id1");
        MyUser myUser2 = new MyUser();
        myUser2.setId(myUser1.getId());
        assertThat(myUser1).isEqualTo(myUser2);
        myUser2.setId("id2");
        assertThat(myUser1).isNotEqualTo(myUser2);
        myUser1.setId(null);
        assertThat(myUser1).isNotEqualTo(myUser2);
    }
}
