package webbansach_backend.com;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import webbansach_backend.com.entity.TheLoai;

@SpringBootTest
class WebbansachBackendApplicationTests {

	@Test
	void contextLoads() {
		TheLoai theLoai = new TheLoai();
		theLoai.setMaTheLoai(1);
		theLoai.setTenTheLoai("Giao khoa");
	}
}
