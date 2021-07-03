export class LocalStorage {
  private KEY: string = 'CREDENTIALS';

  async saveCredentials(data: string) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data))
    } catch (e) {
    }
  }

  async getCredentials() {
    try {
      const data = JSON.parse(<string>localStorage.getItem(this.KEY));
      return data;
    } catch (e) {
      return null;
    }
  }

  async deleteCredentials() {
    try {
      localStorage.removeItem(this.KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

}
