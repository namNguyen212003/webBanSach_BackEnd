//package webbansach_backend.com.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import webbansach_backend.com.entity.Sach;
//import webbansach_backend.com.service.SachService;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/sach")
//public class SachController {
//
//    private final SachService sachService;
//
//    @Autowired
//    public SachController(SachService sachService) {
//        this.sachService = sachService;
//    }
//
//    @GetMapping
//    public List<Sach> getSach() {
//        return sachService.getSach();
//    }
//
////    @GetMapping("/{id}")
////    public Sach getSach(@PathVariable String id) {
//////        return ;
////    }
//
//    @PostMapping
//    public String postSach() {
//        return "sach";
//    }
//
//    @DeleteMapping
//    public String deleteSach() {
//        return "sach";
//    }
//
//    @PutMapping
//    public String putSach() {
//        return "sach";
//    }
//
//
//
//}
