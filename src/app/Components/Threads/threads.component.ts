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
        date: new Date().getTime(),
      })
      .subscribe((message: any) => {
        this.messages.push(message);
        this.message = "";
      });
  }
  deleteMessage(messageId: string) {
    // Utilisation du service messagesService pour supprimer le message
    this.messagesService
      .deleteMessage(messageId)
      // Utilisation d'un observable pour gérer la réponse asynchrone
      .subscribe(() => {
        // Suppression du message du tableau messages
        this.messages = this.messages.filter(
          (message) => message.id !== messageId
        );
      });
  }

  deleteThread(threadId: string) {
    // Utilisation du service threadsService pour supprimer le thread
    this.threadsService.deleteThread(threadId).subscribe(
      () => {
        // Supprimez le thread du tableau des threads
        this.threads = this.threads.filter((thread) => thread.id !== threadId);
        // Si le thread supprimé était celui actuellement sélectionné, déselectionnez-le
        if (this.actualThread && this.actualThread.id === threadId) {
          this.actualThread = { id: "", label: "" };
          this.messages = []; // Vous voudrez peut-être vider également les messages associés
        }
      },
      (error: any) => {
        // Gérez les erreurs ici
        console.error(error);
      }
    );
  }
}
