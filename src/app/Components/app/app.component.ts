import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThreadsComponent } from "../Threads/threads.component";
import { MessagesComponent } from "../Messages/messages.component";
import { User, UserService } from "../../Services/user.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, ThreadsComponent, MessagesComponent, FormsModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  @Input()
  username: string = "";

  constructor(public UserService: UserService) {}
}
