import {LocationResponse} from "./LocationResponse";

export class PostContent {
  id: number;
  createdBy?: any;
  createdAt: Date;
  updatedBy?: any;
  updatedAt?: any;
  isActive: boolean;
  post: string;
  location: LocationResponse;
  isPublic?: boolean;
  userId: number;
  userName: string;
}
