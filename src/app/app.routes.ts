import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { RegistroAlumnoComponent } from './pages/registro-alumno/registro-alumno.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  {
    path: '', 
    component: NavbarComponent, // Layout
    children: [
      { path: 'inicio', component: InicioComponent }, 
      { path: 'registro-alumno', component: RegistroAlumnoComponent},
      { path: 'acerca-de', component: AcercaDeComponent },
      
    ],
  },
];