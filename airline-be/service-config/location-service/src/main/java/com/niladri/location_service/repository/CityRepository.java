package com.niladri.location_service.repository;

import com.niladri.location_service.entity.City;
import com.niladri.location_service.projection.CitySearchProjection;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    boolean existsByCityCode(@NotBlank(message = "City code is required") @Size(max = 10) String cityCode);

    @Query("""
                    SELECT c.id AS id, c.name AS name, c.cityCode AS cityCode
                    FROM City c
                    WHERE LOWER(c.name) LIKE LOWER(CONCAT(:keyword, '%'))
            """)
    Page<CitySearchProjection> findCityByKeyword(@NotBlank(message = "Keyword is required") @Size(max = 100) @Param("keyword") String keyword,
                                                              Pageable pageable);

    @Query("""
                                SELECT c.id AS id, c.name AS name, c.cityCode AS cityCode
                                FROM City c
                                WHERE c.countryCode = :countryCode
            """)
    Page<CitySearchProjection> findByCountryCode(@NotBlank(message = "Country code is required") @Size(max = 5) @Param("countryCode") String countryCode, Pageable pageable);

    Optional<City> findByCityCode(String cityCode);
}
