import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";

export interface Thread {
  id: string;
  label: string;
}

@Injectable({
  providedIn: "root",
})
export class ThreadsService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
    this.getThreads().subscribe((threads: any) => {
      this.threads = threads;
    });
  }
  threads = this.getThreads();

  getThreads() {
    return this.http.get(`${this.apiUrl}/threads`);
  }

  getThread(id: string) {
    return this.http.get(`${this.apiUrl}/threads/${id}`);
  }

  createThread(thread: Thread) {
    return this.http.post(`${this.apiUrl}/threads`, thread);
  }

  updateThread(thread: Thread) {
    return this.http.put(`${this.apiUrl}/threads/${thread.id}`, thread);
  }

  deleteThread(id: string) {
    return this.http.delete(`${this.apiUrl}/threads/${id}`);
  }
}
