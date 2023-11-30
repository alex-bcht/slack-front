import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { Thread, ThreadsService } from "../../Services/threads.service";
import { MessagesComponent } from "../Messages/messages.component";
import { Message, MessagesService } from "../../Services/messages.service";
import { UserService } from "../../Services/user.service";

@Component({
  selector: "app-threads",
  standalone: true,
  imports: [CommonModule, MessagesComponent, FormsModule],
  templateUrl: "./threads.component.html",
  styleUrl: "./threads.component.css",
})
export class ThreadsComponent implements OnInit {
  threads!: Thread[];
  actualThread!: Thread;
  messages!: Message[];
  @Input()
  message!: string;

  constructor(
    public threadsService: ThreadsService,
    public messagesService: MessagesService,
    public userService: UserService
  ) {}

  selectThread(thread: Thread) {
    this.actualThread = thread;
    this.messagesService
      .getMessagesByThreadId(thread.id)
      .subscribe((messages: any) => {
        this.messages = messages;
        console.log(this.messages);
      });
  }

  ngOnInit() {
    this.threadsService.getThreads().subscribe((threads: any) => {
      this.threads = threads;
      console.log(this.threads);
      this.selectThread(this.threads[0]);
    });
  }

  sendMessage() {
    this.messagesService
      .createMessage({
        content: this.message,
        authorId: this.userService.user?.username,
        threadId: this.actualThread.id,
      })
      .subscribe((message: any) => {
        this.messages.push(message);
        this.message = "";
      });
  }
}
