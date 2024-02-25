const DEFAULT_HOST = "http://localhost:3000" as const;

const API_VERSION ="v1" as const


export class ConnectionConfig {

  static setTargetHost(target: string) {
    localStorage.setItem("tartget-host", target);
  }

  static setAuth(username: string, password: string) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  }

  static getTargetHost() {
    const target = localStorage.getItem("tartget-host");
    return {
      host: target || DEFAULT_HOST,
      hostSet: !!target,
    };
  }

  static getAPI(path: string) {
    if(path.startsWith("/")){
      path = path.slice(1);
    }
    const base = ConnectionConfig.getTargetHost().host;
    const url = `${base}/api/${API_VERSION}/${path}`;
    return url;
  }

  static getAuthToken() {
    const auth = ConnectionConfig.getAuth();
    if (!auth) {
      return null;
    }
    return btoa(auth);
  }

  static getAuth() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (!username || !password) {
      return null;
    }
    return (`${username}:${password}`);
  }

  static clearAuth() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  }

  static clearTargetHost() {
    localStorage.removeItem("tartget-host");
  }

  static askForHost() {
    let host = prompt("Enter the target host");
    if(host && host.endsWith("/")){
      host = host.slice(0,-1);
    }
    if (!host || host === "") {
      ConnectionConfig.clearTargetHost();
      return null;
    }
    ConnectionConfig.setTargetHost(host);
    return host;
  }

  static askForAuth() {
    const username = prompt("Enter the username");
    if (!username || username === "") {
      ConnectionConfig.clearAuth();
      return null;
    }
    const password = prompt("Enter the password");
    if (!password || password === "") {
      ConnectionConfig.clearAuth();
      return null;
    }
    ConnectionConfig.setAuth(username, password);
    return `${username}:${password}`;
  }


}
