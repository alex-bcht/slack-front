import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// Définition de l'interface User représentant la structure d'un utilisateur
export interface User {
  id: number;
  username: string;
}

// Décorateur Injectable indiquant que le service peut être injecté au niveau racine
@Injectable({
  providedIn: "root",
})
export class UserService {
  user: undefined | User;

  constructor(private http: HttpClient) {}

  // Méthode de connexion (login) prenant un nom d'utilisateur en paramètre
  login(username: string) {
    // Affichage dans la console du message de connexion avec le nom d'utilisateur
    console.log("login" + username);

    this.http
      .post("http://localhost:3000/users", { username })
      // Abonnement pour recevoir la réponse de l'API
      .subscribe((user: any) => {
        // Affichage dans la console des informations de l'utilisateur reçues
        console.log("user", user);

        // Mise à jour de la propriété user du service avec les données de l'utilisateur
        this.user = user;
      });
  }

  // Méthode de déconnexion (logout)
  logout() {
    // Réinitialisation de la propriété user à undefined
    this.user = undefined;
  }
}
