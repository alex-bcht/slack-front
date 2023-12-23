import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";

export interface Message {
  id: string;
  content: string;
  authorId: string;
  date: string;
  threadId: string;
}

@Injectable({
  providedIn: "root",
})
export class MessagesService {
  messages: Message[] | undefined = [];
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.getApiUrl();
    this.messages = [];
  }

  getMessages() {
    return this.http.get(`${this.apiUrl}/messages`);
  }

  getMessage(id: string) {
    return this.http.get(`${this.apiUrl}/messages/${id}`);
  }

  getMessagesByThreadId(threadId: string) {
    return this.http.get(`${this.apiUrl}/messages?threadId=${threadId}`);
  }

  createMessage(message: any) {
    return this.http.post(`${this.apiUrl}/messages`, message);
  }

  updateMessage(message: any) {
    return this.http.put(`${this.apiUrl}/messages/${message.id}`, message);
  }

  deleteMessage(id: string) {
    return this.http.delete(`${this.apiUrl}/messages/${id}`);
  }
}
