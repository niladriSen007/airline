package com.niladri.location_service.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "city")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "City name is required")
    @Size(max = 100)
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "City code is required")
    @Size(max = 10)
    @Column(nullable = false, unique = true)
    private String cityCode;

    @NotBlank(message = "Country code is required")
    @Size(max = 5)
    @Column(nullable = false)
    private String countryCode;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL,mappedBy = "city")
    private Set<Airport> airports = new HashSet<>();

    @NotBlank(message = "Country name is required")
    @Size(max = 100)
    @Column(nullable = false)
    private String countryName;

    @Size(max = 10)
    private String regionCode;

    @Column(name = "time_zone_id", length = 50)
    private String timeZoneId;
}
