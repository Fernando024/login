import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {} 
  email: string = '';
  password: string = '';
  hide: boolean = true;

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    if (this.email && this.password) {
      this.router.navigate(['/inicio']); // Navega a la página de inicio
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Detecta cambios en los inputs
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.name === "email") this.email = input.value;
    if (input.name === "contraseña") this.password = input.value;
  }


  
}
