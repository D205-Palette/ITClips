package com.ssafy.itclips.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.itclips.global.jwt.JwtAuthenticationFilter;
import com.ssafy.itclips.global.jwt.JwtTokenProvider;
import com.ssafy.itclips.global.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ssafy.itclips.global.oauth2.handler.OAuth2AuthenticationFailureHandler;
import com.ssafy.itclips.global.oauth2.service.CustomOAuth2UserService;
import com.ssafy.itclips.global.login.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import com.ssafy.itclips.global.login.handler.LoginFailureHandler;
import com.ssafy.itclips.global.login.handler.LoginSuccessHandler;
import com.ssafy.itclips.global.login.service.LoginService;
import com.ssafy.itclips.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.hibernate.mapping.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.ssafy.itclips.global.oauth2.handler.OAuth2AuthenticationSuccessHandler;
import java.util.*;
import java.io.IOException;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final LoginService loginService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieOAuth2AuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedOrigin("https://localhost:3000");
        configuration.addAllowedOrigin("http://localhost:5500");
        configuration.addAllowedOrigin("https://localhost");
//        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정 추가
                .formLogin(formLogin -> formLogin.disable())    // FormLogin 사용 x
                .httpBasic(httpBasic -> httpBasic.disable())    // httpBasic 사용 x
                .csrf(csrf -> csrf.disable())

                // 세션 사용하지 않으므로 STATELESS로 설정
                .sessionManagement(sessionManager -> sessionManager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                //== URL별 권한 관리 옵션 ==//
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/", "/index.html","/css/**", "/images/**").permitAll()  // 기본 페이지, static 하위 폴더에 있는 자료들은 모두 접근 가능
                        .requestMatchers("/api/swagger-ui.html", "/api/v3/api-docs/**", "/swagger-resources/**", "/api/swagger-ui/**").permitAll()
                        .requestMatchers("/api/user/signup", "/api/user/oauthSignup").permitAll()   // 회원가입 접근 가능
                        .requestMatchers("/api/user/login", "/api/user/refresh").permitAll()     // 로그인 접근 가능
                        .requestMatchers("/api/user/**").permitAll()    // API 개발 중 접근 없이 swagger 테스트 하기 위함
                        .requestMatchers("/api/roadmap/**").permitAll()    // API 개발 중 접근 없이 swagger 테스트 하기 위함
                        .requestMatchers("/api/chat/**", "/api/ws/**").permitAll()    // API 개발 중 접근 없이 swagger 테스트 하기 위함
                        .anyRequest().authenticated()
                )

                //== 소셜 로그인 설정 ==//
                .oauth2Login(oauth2 -> oauth2
                        .authorizationEndpoint(auth -> auth
                                .baseUri("/oauth2/authorize")
                                .authorizationRequestRepository(cookieOAuth2AuthorizationRequestRepository())
                        )
                        .redirectionEndpoint(redir -> redir
                                .baseUri("/login/oauth2/code/**")
                        )
                        .userInfoEndpoint(userinfo -> userinfo
                                .userService(customOAuth2UserService)   // customUserService 설정
                        )
                        .successHandler(oAuth2AuthenticationSuccessHandler)
                        .failureHandler(oAuth2AuthenticationFailureHandler)
                )
                // 원래 스프링 시큐리티 필터 순서가 LogoutFilter 이후에 로그인 필터 동작
                // 따라서, LogoutFilter 이후에 우리가 만든 필터 동작하도록 설정
                // 순서 : LogoutFilter -> JwtAuthenticationProcessingFilter -> CustomJsonUsernamePasswordAuthenticationFilter
                .addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class)
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * AuthenticationManager 설정 후 등록
     * PasswordEncoder를 사용하는 AuthenticationProvider 지정 (PasswordEncoder는 위에서 등록한 PasswordEncoder 사용)
     * FormLogin(기존 스프링 시큐리티 로그인)과 동일하게 DaoAuthenticationProvider 사용
     * UserDetailsService는 커스텀 LoginService로 등록
     * 또한, FormLogin과 동일하게 AuthenticationManager로는 구현체인 ProviderManager 사용(return ProviderManager)
     *
     */
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(encoder());
        provider.setUserDetailsService(loginService);
        return new ProviderManager(provider);
    }

    /**
     * 로그인 성공 시 호출되는 LoginSuccessJWTProviderHandler 빈 등록
     */
    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler(jwtTokenProvider, userRepository, objectMapper) {
            @Override
            protected void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
                String targetUrl = determineTargetUrl(request, response);
                if (response.isCommitted()) {
                    return;
                }
                getRedirectStrategy().sendRedirect(request, response, targetUrl);
            }
        };
    }

    /**
     * 로그인 실패 시 호출되는 LoginFailureHandler 빈 등록
     */
    @Bean
    public LoginFailureHandler loginFailureHandler() {
        return new LoginFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
                getRedirectStrategy().sendRedirect(request, response, "/login?error");
            }
        };
    }

    /**
     * CustomJsonUsernamePasswordAuthenticationFilter 빈 등록
     * 커스텀 필터를 사용하기 위해 만든 커스텀 필터를 Bean으로 등록
     * setAuthenticationManager(authenticationManager())로 위에서 등록한 AuthenticationManager(ProviderManager) 설정
     * 로그인 성공 시 호출할 handler, 실패 시 호출할 handler로 위에서 등록한 handler 설정
     */
    @Bean
    public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
        CustomJsonUsernamePasswordAuthenticationFilter customFilter = new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
        customFilter.setAuthenticationManager(authenticationManager());
        customFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
        customFilter.setAuthenticationFailureHandler(loginFailureHandler());
        return customFilter;
    }
}
