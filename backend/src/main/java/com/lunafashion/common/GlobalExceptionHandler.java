package com.lunafashion.common;

import com.lunafashion.common.exception.BadRequestException;
import com.lunafashion.common.exception.ResourceNotFoundException;
import com.lunafashion.common.exception.UnauthorizedException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleResourceNotFound(
      ResourceNotFoundException exception,
      HttpServletRequest request
  ) {
    return buildError(HttpStatus.NOT_FOUND, exception.getMessage(), request.getRequestURI());
  }

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<ErrorResponse> handleBadRequest(
      BadRequestException exception,
      HttpServletRequest request
  ) {
    return buildError(HttpStatus.BAD_REQUEST, exception.getMessage(), request.getRequestURI());
  }

  @ExceptionHandler(UnauthorizedException.class)
  public ResponseEntity<ErrorResponse> handleUnauthorized(
      UnauthorizedException exception,
      HttpServletRequest request
  ) {
    return buildError(HttpStatus.UNAUTHORIZED, exception.getMessage(), request.getRequestURI());
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ErrorResponse> handleAccessDenied(
      AccessDeniedException exception,
      HttpServletRequest request
  ) {
    return buildError(HttpStatus.FORBIDDEN, "Access denied", request.getRequestURI());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidation(
      MethodArgumentNotValidException exception,
      HttpServletRequest request
  ) {
    Map<String, String> errors = new LinkedHashMap<>();
    exception.getBindingResult().getFieldErrors().forEach(error ->
        errors.put(error.getField(), error.getDefaultMessage())
    );

    return buildError(
        HttpStatus.BAD_REQUEST,
        "Validation failed",
        request.getRequestURI(),
        errors
    );
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ErrorResponse> handleConstraintViolation(
      ConstraintViolationException exception,
      HttpServletRequest request
  ) {
    Map<String, String> errors = new LinkedHashMap<>();
    exception.getConstraintViolations().forEach(violation ->
        errors.put(violation.getPropertyPath().toString(), violation.getMessage())
    );

    return buildError(
        HttpStatus.BAD_REQUEST,
        "Constraint violation",
        request.getRequestURI(),
        errors
    );
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleException(
      Exception exception,
      HttpServletRequest request
  ) {
    return buildError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Internal server error",
        request.getRequestURI()
    );
  }

  private ResponseEntity<ErrorResponse> buildError(HttpStatus status, String message, String path) {
    return buildError(status, message, path, null);
  }

  private ResponseEntity<ErrorResponse> buildError(
      HttpStatus status,
      String message,
      String path,
      Object errors
  ) {
    return ResponseEntity.status(status).body(ErrorResponse.of(status, message, path, errors));
  }
}
