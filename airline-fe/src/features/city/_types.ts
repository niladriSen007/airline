export type CreateCityRequest = {
  name: string;
  cityCode: string;
  countryCode: string;
  countryName: string;
  regionCode: string;
  timeZoneOffset: string;
};


/** Matches the `content[]` items from the paginated city API */
export type CityData = {
  id: number;
  name: string;
  cityCode: string;
  countryCode: string;
  countryName: string;
  timeZoneOffset: string;
};

/** Matches the outer `data` object of the API response */
export type PaginatedCityResponse = {
  content: CityData[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type CityListResponse = {
  data: PaginatedCityResponse;
};
