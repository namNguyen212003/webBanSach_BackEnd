package webbansach_backend.com.service.handle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import webbansach_backend.com.dao.SachRepository;
import webbansach_backend.com.entity.Sach;
import webbansach_backend.com.service.SachService;

import java.util.List;

@Service
public class SachServiceImpl implements SachService {

    private  final SachRepository sachRepository;

    @Autowired
    public SachServiceImpl(SachRepository sachRepository) {
        this.sachRepository = sachRepository;
    }

    @Override
    public List<Sach> getSach() {
        return sachRepository.findAll();
    }
}
