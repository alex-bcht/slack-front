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
  threadLabel!: string;
  id!: string;

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
      })
      .subscribe((message: any) => {
        this.messages.push(message);
        this.message = "";
      });
  }
  createThread() {
    let lastThreadId = this.getLastThreadId(); // Génère un ID aléatoire pour le thread
    let newThreadId = lastThreadId ? lastThreadId + 1 : 1;
    this.threadsService
      .createThread({
        id: String(newThreadId),
        label: this.threadLabel, // Utilise le contenu du thread
      })
      .subscribe((thread: any) => {
        this.threads.push(thread); // Ajoute le thread à la liste des threads
        this.threadLabel = ""; // Réinitialise le contenu du thread après l'envoi
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
  getLastThreadId(): number | undefined {
    if (this.threads.length > 0) {
      const lastThread = this.threads[this.threads.length - 1]; // Récupère le dernier thread
      return Number(lastThread.id); // Renvoie l'ID du dernier thread
    }
    return undefined; // S'il n'y a pas de thread, renvoie undefined
  }
}
