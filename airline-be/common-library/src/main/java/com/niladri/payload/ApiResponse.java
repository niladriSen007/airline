package com.niladri.payload;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Builder
@Data
public class ApiResponse<T> {
    private String status;
    private int statusCode;
    private String message;
    private T data;
    private Long timestamp;
    private String error;

    public static <T> ApiResponse<T> success(T data, int statusCode) {
        return ApiResponse.<T>builder()
                .status("success")
                .statusCode(statusCode)
                .data(data)
                .error(null)
                .timestamp(Instant.now().toEpochMilli())
                .build();
    }

    public static <T> ApiResponse<T> success(T data) {
        return success(data, 200);
    }

    public static <T> ApiResponse<T> error(String errorMessage, int statusCode) {
        return ApiResponse.<T>builder()
                .status("error")
                .statusCode(statusCode)
                .data(null)
                .error(errorMessage)
                .timestamp(Instant.now().toEpochMilli())
                .build();
    }

}
