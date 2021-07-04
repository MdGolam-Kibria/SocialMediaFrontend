import {LocationResponse} from "./LocationResponse";

export class LocationSearchResponse {
  timestamp: number;
  statusCode: number;
  status: string;
  message: string;
  content: LocationResponse[];
  numberOfElement: number;
  rowCount: number;
}
