package com.niladri.dto.request;

import com.niladri.embeddable.Address;
import com.niladri.embeddable.Geocode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZoneId;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateAirportRequest {
    private String iataCode;
    private String name;
    private ZoneId timeZone;
    private Address address;
    private String cityCode;
    private Geocode geoCode;
}
