import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Message, MessagesService } from "../../Services/messages.service";

@Component({
  selector: "app-messages",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./messages.component.html",
  styleUrl: "./messages.component.css",
})
export class MessagesComponent {
  constructor(private messagesService: MessagesService) {}
  @Input()
  message!: Message;

  formaterTimestamp() {
    console.log(this.message.date);
    let date = new Date(this.message.date);
    let jour = date.getDate().toString().padStart(2, "0");
    let mois = (date.getMonth() + 1).toString().padStart(2, "0"); // Janvier = 0
    let annee = date.getFullYear();
    let heures = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let secondes = date.getSeconds().toString().padStart(2, "0");

    return `${jour}/${mois}/${annee} ${heures}:${minutes}:${secondes}`;
  }
}
