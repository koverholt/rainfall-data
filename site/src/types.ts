export interface RainfallData {
  site: number;
  location: string;
  'Previous 1 hour': number;
  'Previous 3 hours': number;
  'Previous 6 hours': number;
  'Previous 24 hours': number;
  'Since midnight': number;
  '1 day ago': number;
  '2 days ago': number;
  '3 days ago': number;
  '4 days ago': number;
  '5 day total': number;
  '30 day total': number;
  'This month': number;
  'This year': number;
  'Last year': number;
  'Site name': string;
  'Year over year': number;
}

export interface Site {
  site: number;
  location: string;
}

export interface ApiResponse {
  rainfall_amounts: RainfallData[];
  list_of_sites: Site[];
}
