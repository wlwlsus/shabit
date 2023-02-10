package com.ezpz.shabit.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.swing.text.Utilities;
import java.util.Base64;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@Slf4j
public class WebInterceptor implements HandlerInterceptor {
    private static final String[] ignoreList = {"/api/v1/user", "/api/v1/user/login", "/api/v1/user/logout",
            "/api/v1/user/token", "/api/v1/user/email-valid/**", "/api/v1/user/email-check/**",
            "/api/v1/user/password-find/**"};

    private static final String[] adminList = {"/api/v1/admin/**"};

    // 컨트롤러의 메서드에 매핑된 특정 URI가 호출됐을 때 실행되는 메서드로, 컨트롤러를 경유(접근)하기 직전에 실행되는 메서드입니다.
    // 우리는 사용자가 어떠한 기능을 수행했는지를 파악하기 위하여 해당 기능과 매핑된 URI 정보가 콘솔에 로그가 출력되도록 처리합니다.
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();

        if(request.getRequestURI().equals("/api/v1/admin/alarm") && request.getMethod().equals("GET")) return true;

        if(checkList(adminList, requestURI)) {String authorization = request.getHeader("Authorization");
            Pattern tokenPattern = Pattern.compile("(?<=Bearer\s).*");

            Matcher matcher = tokenPattern.matcher(authorization);

            String tok = null;
            String tokEmail = null;
            if(matcher.find()) {
                tok = matcher.group().split("\\.")[1];
                Base64.Decoder decoder = Base64.getDecoder();
                String payload = new String(decoder.decode(tok));

                ObjectMapper mapper = new ObjectMapper();
                Map<String, String> returnMap = mapper.readValue(payload, Map.class);
                tokEmail = returnMap.get("sub");
            }

            assert tokEmail != null;
            if(tokEmail.equals("ssafyezpz@gmail.com")) return true;
            else{
                log.error("토큰 정보가 일치하지 않습니다.");
                response.sendRedirect("/token-error");
                return false;
            }
        }else if(!checkList(ignoreList, requestURI)){
            log.info("access token과 email 비교 {}", requestURI);
            Map<String, String> pathVariables = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
            if(pathVariables == null || pathVariables.get("email") == null) return true; // 비교할 이메일이 없으면 넘김
            String authorization = request.getHeader("Authorization");
            Pattern tokenPattern = Pattern.compile("(?<=Bearer\s).*");

            Matcher matcher = tokenPattern.matcher(authorization);

            String tok = null;
            String tokEmail = null;
            if(matcher.find()) {
                tok = matcher.group().split("\\.")[1];
                Base64.Decoder decoder = Base64.getDecoder();
                String payload = new String(decoder.decode(tok));

                ObjectMapper mapper = new ObjectMapper();
                Map<String, String> returnMap = mapper.readValue(payload, Map.class);
                tokEmail = returnMap.get("sub");
            }

            assert tokEmail != null;
            if(tokEmail.equals(pathVariables.get("email"))) return true;
            else{
                log.error("토큰 정보가 일치하지 않습니다.");
                response.sendRedirect("/token-error");
                return false;
            }
        }
        log.info("[preHandle] : " + request.getRequestURI() + " request start");
        return true;
    }

    private boolean checkList(String[] list, String requestURI) {
        return PatternMatchUtils.simpleMatch(list, requestURI);
    }

    // 컨트롤러를 경유(접근) 한 후, 즉 화면(View)으로 결과를 전달하기 전에 실행되는 메서드입니다.
    // preHandle( )과는 반대로 요청(Request)의 끝을 알리는 로그가 콘솔에 출력되도록 처리합니다.
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        log.info("[postHandle] : " + request.getRequestURI() + " request done");
    }
}
