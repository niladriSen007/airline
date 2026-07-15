# Location Service — API Reference

Base URL: `/api/v1`

---

## Airport Endpoints

### 1. Create Airport
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/v1/airports` |

**Request Body** (`AirportRequest`)
```json
{
  "iataCode": "DEL",        // string, required, exactly 3 chars
  "name": "Indira Gandhi International Airport",  // string, required
  "timeZone": "Asia/Kolkata",  // string (ZoneId), optional
  "address": {
    "location": "New Delhi, India",  // string, optional
    "postalCode": "110037"           // string, optional
  },
  "cityId": 1,        // long, required
  "geoCode": {
    "latitude": 28.5665,    // double, optional
    "longitude": 77.1031    // double, optional
  }
}
```

**Response Body** (`ApiResponse<AirportResponse>`)
```json
{
  "status": 201,
  "data": {
    "id": 1,
    "iataCode": "DEL",
    "name": "Indira Gandhi International Airport",
    "timeZone": "Asia/Kolkata",
    "address": {
      "location": "New Delhi, India",
      "postalCode": "110037"
    },
    "city": {
      "id": 1,
      "name": "Delhi",
      "cityCode": "DEL",
      "countryCode": "IN",
      "countryName": "India",
      "regionCode": "DL",
      "timeZoneOffset": "+05:30"
    },
    "geoCode": {
      "latitude": 28.5665,
      "longitude": 77.1031
    }
  }
}
```

---

### 2. Create Bulk Airports
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/v1/airports/bulk` |

**Request Body** (`List<AirportRequest>`)
```json
[
  {
    "iataCode": "DEL",
    "name": "Indira Gandhi International Airport",
    "timeZone": "Asia/Kolkata",
    "address": { "location": "New Delhi, India", "postalCode": "110037" },
    "cityId": 1,
    "geoCode": { "latitude": 28.5665, "longitude": 77.1031 }
  },
  {
    "iataCode": "BOM",
    "name": "Chhatrapati Shivaji Maharaj International Airport",
    "timeZone": "Asia/Kolkata",
    "address": { "location": "Mumbai, India", "postalCode": "400099" },
    "cityId": 2,
    "geoCode": { "latitude": 19.0896, "longitude": 72.8656 }
  },
  {
    "iataCode": "BLR",
    "name": "Kempegowda International Airport",
    "timeZone": "Asia/Kolkata",
    "address": { "location": "Bengaluru, India", "postalCode": "560300" },
    "cityId": 3,
    "geoCode": { "latitude": 13.1986, "longitude": 77.7066 }
  },
  {
    "iataCode": "HYD",
    "name": "Rajiv Gandhi International Airport",
    "timeZone": "Asia/Kolkata",
    "address": { "location": "Hyderabad, India", "postalCode": "500409" },
    "cityId": 4,
    "geoCode": { "latitude": 17.2403, "longitude": 78.4294 }
  },
  {
    "iataCode": "MAA",
    "name": "Chennai International Airport",
    "timeZone": "Asia/Kolkata",
    "address": { "location": "Chennai, India", "postalCode": "600027" },
    "cityId": 5,
    "geoCode": { "latitude": 12.9941, "longitude": 80.1709 }
  }
]
```

**Response Body** (`ApiResponse<List<AirportResponse>>`)
```json
{
  "status": 201,
  "data": [ { /* AirportResponse */ }, { /* AirportResponse */ } ]
}
```

---

### 3. Get Airport by ID
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/v1/airports/{id}` |
| **Path Param** | `id` — Long |

**Response Body** (`ApiResponse<AirportResponse>`)
```json
{
  "status": 200,
  "data": {
    "id": 1,
    "iataCode": "DEL",
    "name": "Indira Gandhi International Airport",
    "timeZone": "Asia/Kolkata",
    "address": { "location": "New Delhi, India", "postalCode": "110037" },
    "city": { "id": 1, "name": "Delhi", "cityCode": "DEL", "countryCode": "IN", "countryName": "India", "regionCode": "DL", "timeZoneOffset": "+05:30" },
    "geoCode": { "latitude": 28.5665, "longitude": 77.1031 }
  }
}
```

---

### 4. Get All Airports
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/v1/airports` |

**Response Body** (`ApiResponse<List<AirportResponse>>`)
```json
{
  "status": 200,
  "data": [ { /* AirportResponse */ } ]
}
```

---

### 5. Get Airports by City ID
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/v1/airports/city/{cityId}` |
| **Path Param** | `cityId` — Long |

**Response Body** (`ApiResponse<List<AirportResponse>>`)
```json
{
  "status": 200,
  "data": [ { /* AirportResponse */ } ]
}
```

---

### 6. Update Airport
| | |
|---|---|
| **Method** | `PUT` |
| **URL** | `/api/v1/airports/{id}` |
| **Path Param** | `id` — Long |

**Request Body** (`UpdateAirportRequest`) — all fields optional
```json
{
  "iataCode": "DEL",
  "name": "Updated Airport Name",
  "timeZone": "Asia/Kolkata",
  "address": {
    "location": "New Delhi, India",
    "postalCode": "110037"
  },
  "cityCode": "DEL",
  "geoCode": {
    "latitude": 28.5665,
    "longitude": 77.1031
  }
}
```

**Response Body** (`ApiResponse<AirportResponse>`)
```json
{
  "status": 200,
  "data": { /* AirportResponse */ }
}
```

---

### 7. Delete Airport
| | |
|---|---|
| **Method** | `DELETE` |
| **URL** | `/api/v1/airports/{id}` |
| **Path Param** | `id` — Long |

**Response Body** (`ApiResponse<String>`)
```json
{
  "status": 200,
  "data": "Airport deleted successfully"
}
```

---

## City Endpoints

### 1. Create City
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/v1/cities` |

**Request Body** (`CityRequest`)
```json
{
  "name": "Delhi",          // string, required, max 100 chars
  "cityCode": "DEL",        // string, required, max 10 chars
  "countryCode": "IN",      // string, required, max 5 chars
  "countryName": "India",   // string, required, max 100 chars
  "regionCode": "DL",       // string, optional, max 10 chars
  "timeZoneOffset": "+05:30" // string, optional, max 10 chars
}
```

**Response Body** (`ApiResponse<CityResponse>`)
```json
{
  "status": 201,
  "data": {
    "id": 1,
    "name": "Delhi",
    "cityCode": "DEL",
    "countryCode": "IN",
    "countryName": "India",
    "regionCode": "DL",
    "timeZoneOffset": "+05:30"
  }
}
```

---

### 2. Create Bulk Cities
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/v1/cities/bulk` |

**Request Body** (`List<CityRequest>`)
```json
[
  [
    { "name": "Mumbai", "cityCode": "BOM", "countryCode": "IN", "countryName": "India", "regionCode": "MH", "timeZoneOffset": "+05:30" },
    { "name": "Delhi", "cityCode": "DEL", "countryCode": "IN", "countryName": "India", "regionCode": "DL", "timeZoneOffset": "+05:30" },
    { "name": "Bengaluru", "cityCode": "BLR", "countryCode": "IN", "countryName": "India", "regionCode": "KA", "timeZoneOffset": "+05:30" },
    { "name": "Chennai", "cityCode": "MAA", "countryCode": "IN", "countryName": "India", "regionCode": "TN", "timeZoneOffset": "+05:30" },
    { "name": "Kolkata", "cityCode": "CCU", "countryCode": "IN", "countryName": "India", "regionCode": "WB", "timeZoneOffset": "+05:30" },
    { "name": "Hyderabad", "cityCode": "HYD", "countryCode": "IN", "countryName": "India", "regionCode": "TS", "timeZoneOffset": "+05:30" },
    { "name": "Pune", "cityCode": "PNQ", "countryCode": "IN", "countryName": "India", "regionCode": "MH", "timeZoneOffset": "+05:30" },
    { "name": "Ahmedabad", "cityCode": "AMD", "countryCode": "IN", "countryName": "India", "regionCode": "GJ", "timeZoneOffset": "+05:30" },
    { "name": "Jaipur", "cityCode": "JAI", "countryCode": "IN", "countryName": "India", "regionCode": "RJ", "timeZoneOffset": "+05:30" },
    { "name": "Lucknow", "cityCode": "LKO", "countryCode": "IN", "countryName": "India", "regionCode": "UP", "timeZoneOffset": "+05:30" },
    { "name": "New York", "cityCode": "NYC", "countryCode": "US", "countryName": "United States", "regionCode": "NY", "timeZoneOffset": "-05:00" },
    { "name": "London", "cityCode": "LON", "countryCode": "GB", "countryName": "United Kingdom", "regionCode": "ENG", "timeZoneOffset": "+00:00" },
    { "name": "Dubai", "cityCode": "DXB", "countryCode": "AE", "countryName": "United Arab Emirates", "regionCode": "DU", "timeZoneOffset": "+04:00" },
    { "name": "Singapore", "cityCode": "SIN", "countryCode": "SG", "countryName": "Singapore", "regionCode": "SG", "timeZoneOffset": "+08:00" },
    { "name": "Tokyo", "cityCode": "TYO", "countryCode": "JP", "countryName": "Japan", "regionCode": "13", "timeZoneOffset": "+09:00" }
  ]
}
```

**Response Body** (`ApiResponse<List<CityResponse>>`)
```json
{
  "status": 201,
  "data": [ { /* CityResponse */ } ]
}
```

---

### 3. Get City by ID
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/v1/cities/{id}` |
| **Path Param** | `id` — Long |

**Response Body** (`ApiResponse<CityResponse>`)
```json
{
  "status": 200,
  "data": {
    "id": 1,
    "name": "Delhi",
    "cityCode": "DEL",
    "countryCode": "IN",
    "countryName": "India",
    "regionCode": "DL",
    "timeZoneOffset": "+05:30"
  }
}
```

---

### 4. Get All Cities (Paginated)
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/v1/cities` |

**Query Parameters**
| Param | Type | Default | Description |
|---|---|---|---|
| `page` | int | `0` | Page number (0-based) |
| `size` | int | `20` | Page size |
| `sortBy` | string | `name` | Field to sort by |
| `sortDirection` | string | `asc` | Sort direction (`asc` / `desc`) |

**Response Body** (`ApiResponse<Page<CityResponse>>`)
```json
{
  "status": 200,
  "data": {
    "content": [ { /* CityResponse */ } ],
    "totalElements": 100,
    "totalPages": 5,
    "size": 20,
    "number": 0
  }
}
```

---

### 5. Update City
| | |
|---|---|
| **Method** | `PUT` |
| **URL** | `/api/v1/cities/{id}` |
| **Path Param** | `id` — Long |

**Request Body** (`UpdateCityRequest`) — all fields optional
```json
{
  "name": "New Delhi",
  "cityCode": "DEL",
  "countryCode": "IN",
  "countryName": "India",
  "regionCode": "DL",
  "timeZoneOffset": "+05:30"
}
```

**Response Body** (`ApiResponse<CityResponse>`)
```json
{
  "status": 200,
  "data": { /* CityResponse */ }
}
```

---

### 6. Delete City
| | |
|---|---|
| **Method** | `DELETE` |
| **URL** | `/api/v1/cities/{id}` |
| **Path Param** | `id` — Long |

**Response Body** (`ApiResponse<Void>`)
```json
{
  "status": 200,
  "data": null
}
```

---

### 7. Search Cities
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/v1/cities/search` |

**Query Parameters**
| Param | Type | Required | Default | Description |
|---|---|---|---|---|
| `keyword` | string | ✅ | — | Search keyword |
| `page` | int | ❌ | `0` | Page number (0-based) |
| `size` | int | ❌ | `20` | Page size |

**Response Body** (`ApiResponse<Page<CitySearchResponse>>`)
```json
{
  "status": 200,
  "data": {
    "content": [
      {
        "id": 1,
        "name": "Delhi",
        "cityCode": "DEL"
      }
    ],
    "totalElements": 5,
    "totalPages": 1,
    "size": 20,
    "number": 0
  }
}
```

---

### 8. Get Cities by Country Code
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/v1/cities/country/{countryCode}` |
| **Path Param** | `countryCode` — string (auto-uppercased) |

**Query Parameters**
| Param | Type | Default | Description |
|---|---|---|---|
| `page` | int | `0` | Page number (0-based) |
| `size` | int | `20` | Page size |

**Response Body** (`ApiResponse<Page<CitySearchResponse>>`)
```json
{
  "status": 200,
  "data": {
    "content": [
      {
        "id": 1,
        "name": "Delhi",
        "cityCode": "DEL"
      }
    ],
    "totalElements": 10,
    "totalPages": 1,
    "size": 20,
    "number": 0
  }
}
```

---

### 9. Check City Exists by City Code
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/v1/cities/exists/{cityCode}` |
| **Path Param** | `cityCode` — string (auto-uppercased) |

**Response Body** (`ApiResponse<Boolean>`)
```json
{
  "status": 200,
  "data": true
}
```

---

## Shared Types

### `Address`
| Field | Type | Description |
|---|---|---|
| `location` | string | Human-readable location string |
| `postalCode` | string | Postal / ZIP code |

### `Geocode`
| Field | Type | Description |
|---|---|---|
| `latitude` | double | Latitude coordinate |
| `longitude` | double | Longitude coordinate |

### `ApiResponse<T>`
All endpoints return a unified `ApiResponse` wrapper:
| Field | Type | Description |
|---|---|---|
| `status` | int | HTTP status code |
| `data` | `T` | Response payload |
