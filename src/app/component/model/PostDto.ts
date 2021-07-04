import {LocationResponse} from "./LocationResponse";

export class PostDto {
  post: string;
  location: LocationResponse;
  isPublic: boolean;
}
