import {LoginResponse} from "../component/model/LoginResponse";
import {plainToClass} from "class-transformer";
import {Observable} from "rxjs";

export class LocalStorage {
  KEY: string = '';


  async saveCredentials(data: LoginResponse, message: string) {
    try {
      debugger
      localStorage.setItem("CREDENTIALS", JSON.stringify(data))
    } catch (e) {
    }
  }

  getCredentials(): LoginResponse | null {
    try {
      const data = JSON.parse(<string>localStorage.getItem("CREDENTIALS"));
      return plainToClass(LoginResponse, data);
    } catch (e) {
      return null;
    }
  }

  async deleteCredentials() {
    try {
      localStorage.removeItem("CREDENTIALS");
      return true;
    } catch (e) {
      return false;
    }
  }

}
