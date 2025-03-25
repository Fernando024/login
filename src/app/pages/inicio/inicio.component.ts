import { Component, ViewChild, ElementRef, Pipe, PipeTransform, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../servicios/user.service';

//Funcion para mostrar algunas palabras de las plantillas 
@Pipe({
  name: 'limitWords',
  standalone: true
})
export class LimitWordsPipe implements PipeTransform {
  transform(value: string, words: number): string {
    if (!value) return '';
    const wordsArray = value.split(' ');
    return wordsArray.slice(0, words).join(' ') + (wordsArray.length > words ? '...' : '');
  }
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, LimitWordsPipe],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  @ViewChild('programaTextarea') programaTextarea!: ElementRef<HTMLTextAreaElement>;
  
  editingTemplate: any = null;
  editedContent: string = '';
  editedTitle: string = '';
  creatingNewTemplate = false;
  newTemplateTitle = '';
  newTemplateContent = '';
  templates: any[] = [];
  userInfo: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadTemplatesFromStorage();
      // se llama al servico de usuario 
      this.userService.getUserInfo().subscribe((user) => {
        this.userInfo = user;
      });
  }
   //Carga las plantillas
  private loadTemplatesFromStorage() {
    const savedTemplates = localStorage.getItem('templates');
    if (savedTemplates) {
      this.templates = JSON.parse(savedTemplates);
      this.actualizarTextosCortos();
    } 
  }
  //Previa basado en texto de inicio de la plantilla
  private actualizarTextosCortos() {
    this.templates.forEach(template => {
      if (template.fullContent && !template.shortText) {
        template.shortText = this.generateShortText(template.fullContent);
      }
    });
  }
  //Texto de corto de previa
  private generateShortText(content: string): string {
    const words = content.split(' ').slice(0, 7).join(' ');
    return words.length > 50 ? words.substring(0, 50) + '...' : words;
  }
  //cargar las plantillas
  loadTemplate(fullContent: string): void {
    if (this.programaTextarea) {
      this.programaTextarea.nativeElement.value = fullContent;
    }
  }
  //editar plantillas
  editTemplate(template: any, event: MouseEvent): void {
    event.stopPropagation();
    this.editingTemplate = { ...template }; 
    this.editedContent = template.fullContent; 
    this.editedTitle = template.title; 
  }
  //Guardar
  saveTemplate(): void {
    if (this.editingTemplate) {
      const index = this.templates.findIndex(t => t.id === this.editingTemplate.id);
  
      this.templates[index] = {
        ...this.templates[index],
        title: this.editedTitle.trim(),
        fullContent: this.editedContent,
        shortText: this.generateShortText(this.editedContent) 
      };
  
      this.guardarYActualizar();
      this.editingTemplate = null;
    }
  }
  //Crear plantillas 
  createNewTemplate(): void {
    if (this.newTemplateTitle && this.newTemplateContent) {
      const newTemplate = {
        id: Date.now(),
        title: this.newTemplateTitle.trim(),
        shortText: this.generateShortText(this.newTemplateContent),
        fullContent: this.newTemplateContent.trim(),
        icon: 'assets/imagenes/plantilla-icono.png',
        editIcon: 'assets/imagenes/editar-icono.png'
      };

      this.templates = [...this.templates, newTemplate];
      this.guardarYActualizar();
      this.resetForm();
    }
  }

  //Borrar plantillas
  deleteTemplate(templateId: number, event: MouseEvent): void {
    event.stopPropagation();
    if(confirm('¿Estás seguro de eliminar esta plantilla?')) {
      this.templates = this.templates.filter(t => t.id !== templateId);
      this.guardarYActualizar();
    }
  }
  //Guardar plantillas
  private guardarYActualizar() {
    localStorage.setItem('templates', JSON.stringify(this.templates));
    this.templates = [...this.templates];
  }
  //restablecer los valores del formulario
  private resetForm() {
    this.creatingNewTemplate = false;
    this.newTemplateTitle = '';
    this.newTemplateContent = '';
  }
}