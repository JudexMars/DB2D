package org.judexmars.db2d.exception.handler;

import org.judexmars.db2d.exception.AccountAlreadyExistsException;
import org.judexmars.db2d.exception.EmailTakenException;
import org.judexmars.db2d.exception.ResourceNotFoundException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.text.ParseException;
import java.util.List;
import java.util.Objects;

@RestControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ProblemDetail handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        List<String> body =
                ex.getBindingResult().getAllErrors().stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .filter(Objects::nonNull)
                        .toList();
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, body.toString());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleClientError(ResourceNotFoundException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(AccountAlreadyExistsException.class)
    public ProblemDetail handleAccountAlreadyExists(AccountAlreadyExistsException accountAlreadyExistsException) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, accountAlreadyExistsException.getMessage());
    }

    @ExceptionHandler(EmailTakenException.class)
    public ProblemDetail handleEmailTaken(EmailTakenException emailTakenException) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, emailTakenException.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ProblemDetail handleBadCredentials(BadCredentialsException badCredentialsException) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, badCredentialsException.getMessage());
    }

    @ExceptionHandler(ParseException.class)
    public ProblemDetail handleParseException(ParseException parseException) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, parseException.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDeniedException(AccessDeniedException exception) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, exception.getMessage());
    }
}
