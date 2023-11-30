import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

// Import des composants ThreadsComponent et MessagesComponent
/* import { ThreadsComponent } from "../Threads/threads.component";
 import { MessagesComponent } from "../Messages/messages.component"; */ // DECOMMENTER L'IMPORT

// Import du service User et UserService depuis le fichier user.service
import { User, UserService } from "../../Services/user.service";

// Import du module FormsModule pour la liaison bidirectionnelle avec ngModel
import { FormsModule } from "@angular/forms";

// Définition du composant principal avec le décorateur @Component
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    /* ThreadsComponent, MessagesComponent, */ FormsModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  @Input()
  username: string = "";

  // Constructeur du composant avec injection du service UserService
  constructor(public UserService: UserService) {}
}
