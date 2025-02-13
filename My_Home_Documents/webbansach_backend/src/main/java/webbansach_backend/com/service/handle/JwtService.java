package webbansach_backend.com.service.handle;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import webbansach_backend.com.entity.NguoiDung;
import webbansach_backend.com.entity.Quyen;
import webbansach_backend.com.service.UserService;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Component
public class JwtService {
    public static final String SERECT = "B1A7D4F85C7E6D59D8F4A1B3C6E9F8712A6D4E8F5B7C9D2A1E4F6D8A2C5B9F3"; // 64 ký tự
    private final UserService userService;

    public JwtService(UserService userService) {
        this.userService = userService;
    }

    // Tạo jwt dựa trên tên đăng nhập
    public String generateJwtToken(String tenDangNhap) {
        Map<String, Object> claims = new HashMap<>();
        NguoiDung nguoiDung = userService.findByUsername(tenDangNhap);
        if(nguoiDung!=null && nguoiDung.getDanhSachQuyen().size() > 0){
            List<Quyen> list = nguoiDung.getDanhSachQuyen();
            for(Quyen quyen : list){
                if (quyen.getTenQuyen().equals("ADMIN")){ // để gửi lên frontEnd xem người dùng đăng nhập có phải admin ko? nếu là admin cho vào, ko thì ko cho vào.
                    claims.put("role", "ADMIN"); break;
                }
                if (quyen.getTenQuyen().equals("STAFF")){
                    claims.put("role", "STAFF"); break;
                }
                if (quyen.getTenQuyen().equals("USER")){
                    claims.put("role", "USER"); break;
                }
            }
        }
        return creatToken(claims,tenDangNhap);
    }

    private String creatToken(Map<String, Object> claims, String tenDangNhap) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(tenDangNhap)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+30*60*1000)) // JWT hết
                .signWith(getSignekey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // lấy serect key
    private Key getSignekey() {
        byte[] keyBytes = Decoders.BASE64.decode(SERECT);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // lấy role
    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    // Trích xuất thông tin, lấy ra 1 token
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(getSignekey()).parseClaimsJws(token).getBody();
    }

    // trích xuất thông tin cho 1 claims
    public <T> T extractClaim(String token, Function<Claims, T> claimsTFunction) {
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    // Kiểm tra thời gian hết hạn từ JWT
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Kiểm tra tới thời gian hết hạn tu JWT
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Kiểm tra JWT đã hết hạn
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // kiểm tra tính hợp lệ
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String tenDangNhap = extractUsername(token);
        return (tenDangNhap.equals(userDetails.getUsername()) && !isTokenExpired(token));
    };

}
