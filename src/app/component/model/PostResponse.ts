import {PostContent} from "./PostContent";

export class PostResponse{
  timestamp: number;
  statusCode: number;
  status: string;
  message: string;
  content: PostContent[];
  numberOfElement: number;
  rowCount: number;
}
