package webbansach_backend.com.security;

// chứa token JWT sau khi xác thực thành công.


import java.util.List;

public class JwtResponse {
    private final String jwt;
    private List<String> roles;

    public JwtResponse(String jwt) {
        this.jwt = jwt;
        this.roles = roles;
    }

    public String getJwt() {
        return jwt;
    }

    public List<String> getRoles() {
        return roles;
    }
}
