package com.niladri.location_service.repository;

import com.niladri.dto.response.AirportResponse;
import com.niladri.location_service.entity.Airport;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface AirportRepository extends JpaRepository<Airport,Long> {
    boolean existsByIataCode(String iataCode);

    Optional<Airport> findByIataCode(@NotBlank(message = "IATA code is mandatory") @Size(min = 3, max = 3, message = "IATA code must be exactly 3 characters") String iataCode);

    @Query("""
            SELECT a FROM Airport a WHERE a.city.id = :cityId
            """)
    Optional<Airport> findByCityId(@NotBlank(message = "City ID is mandatory") @Size(min = 2, message = "City ID must be a positive number") Long cityId);
}
