package com.lunafashion.common;

import java.time.Instant;
import org.springframework.http.HttpStatus;

public record ErrorResponse(
    boolean success,
    int status,
    String error,
    String message,
    String path,
    Object errors,
    Instant timestamp
) {

  public static ErrorResponse of(HttpStatus status, String message, String path) {
    return of(status, message, path, null);
  }

  public static ErrorResponse of(HttpStatus status, String message, String path, Object errors) {
    return new ErrorResponse(
        false,
        status.value(),
        status.getReasonPhrase(),
        message,
        path,
        errors,
        Instant.now()
    );
  }
}
