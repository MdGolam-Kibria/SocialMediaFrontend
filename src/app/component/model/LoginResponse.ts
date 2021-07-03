import {LoginContent} from "./LoginContent";

export class LoginResponse{
  timestamp: number;
  statusCode: number;
  status: string;
  message: string;
  content: LoginContent;
  numberOfElement: number;
  rowCount: number;
}
