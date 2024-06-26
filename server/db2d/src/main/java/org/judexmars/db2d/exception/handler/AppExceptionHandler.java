package org.judexmars.db2d.exception.handler;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.judexmars.db2d.dto.BaseMapResponseDto;
import org.judexmars.db2d.dto.BaseResponseDto;
import org.judexmars.db2d.exception.*;
import org.judexmars.db2d.service.MessageRenderer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;

@RestControllerAdvice
@RequiredArgsConstructor
public class AppExceptionHandler {

    private final MessageRenderer messageRenderer;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<BaseMapResponseDto> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        var errors = new HashMap<String, String>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            if (error instanceof FieldError) {
                String fieldName = ((FieldError) error).getField();
                String errorMessage = error.getDefaultMessage();
                errors.put(fieldName, errorMessage != null ? errorMessage : "Unknown");
            }
        });

        return ResponseEntity.badRequest().body(new BaseMapResponseDto(400, errors));
    }

    @ExceptionHandler(BaseNotFoundException.class)
    public ResponseEntity<BaseResponseDto> handleResourceNotFound(BaseNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new BaseResponseDto(404, messageRenderer.render(ex.getMessageCode(), ex.getArgs())));
    }

    @ExceptionHandler(EmailTakenException.class)
    public ResponseEntity<BaseResponseDto> handleEmailTaken(EmailTakenException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new BaseResponseDto(409, messageRenderer.render(ex.getMessageCode(), ex.getArgs())));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<BaseResponseDto> handleBadCredentials() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new BaseResponseDto(401, messageRenderer.render("exception.bad_credentials")));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<BaseResponseDto> handleAccessDeniedException() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new BaseResponseDto(403, messageRenderer.render("exception.access_denied")));
    }

    @ExceptionHandler(ConfirmPasswordException.class)
    public ResponseEntity<BaseResponseDto> handleConfirmPasswordException(ConfirmPasswordException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new BaseResponseDto(401, messageRenderer.render(ex.getMessageCode())));
    }

    @ExceptionHandler(WrongPasswordException.class)
    public ResponseEntity<BaseResponseDto> handleWrongPasswordException(WrongPasswordException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new BaseResponseDto(401, messageRenderer.render(ex.getMessageCode())));
    }

    @ExceptionHandler(OwnerKickException.class)
    public ResponseEntity<BaseResponseDto> handleOwnerKickException(OwnerKickException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new BaseResponseDto(400, messageRenderer.render(ex.getMessageCode())));
    }

    @ExceptionHandler(
            {InvalidJwtException.class, ExpiredJwtException.class,
                    UnsupportedJwtException.class,
                    MalformedJwtException.class, SignatureException.class})
    public ResponseEntity<BaseResponseDto> handleAccountJwtException() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new BaseResponseDto(401, messageRenderer.render("exception.jwt")));
    }
}
