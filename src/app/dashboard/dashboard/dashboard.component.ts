import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../services/formulario.service';
import { Usuario } from './componentes/formulario/usuario.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  nombreCompleto: string = '';
  usuarioActual: Usuario | null = null; // Declarar la propiedad y definir el tipo

  constructor(private formularioService: FormularioService) {}

  ngOnInit() {
    this.formularioService.usuarioActual$.subscribe((usuario) => {
      this.usuarioActual = usuario;
      this.nombreCompleto = this.usuarioActual
        ? `${this.usuarioActual.nombre} ${this.usuarioActual.apellido}`
        : '';
    });
  }
}
