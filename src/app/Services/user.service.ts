import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface User {
  id: number;
  username: string;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  user: undefined | User;

  constructor(private http: HttpClient) {}

  login(username: string) {
    console.log("login" + username);
    this.http
      .post("http://localhost:3000/users", { username })
      .subscribe((user: any) => {
        console.log("user", user);
        this.user = user;
      });
  }

  logout() {
    this.user = undefined;
  }
}
