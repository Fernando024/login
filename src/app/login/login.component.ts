import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true, // IMPORTANTE: Indicar que es standalone
  imports: [CommonModule, FormsModule], // Asegurar que FormsModule está importado
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hide: boolean = true;

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

  // Detecta cambios en los inputs
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.name === "email") this.email = input.value;
    if (input.name === "contraseña") this.password = input.value;
  }
}
