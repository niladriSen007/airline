package com.niladri.location_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.niladri.embeddable.Address;
import com.niladri.embeddable.Geocode;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "airport")
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 3, unique = true)
    private String iataCode;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(name = "time_zone_id", length = 50)
    private String timeZoneId;

    @Embedded
    private Address address;

    // Same bounded context — direct JPA relationship
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "city_id", nullable = false)
    @JsonIgnore
    private City city;

    @Embedded
    private Geocode geoCode;

}
