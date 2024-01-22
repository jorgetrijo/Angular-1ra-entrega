import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../../../../services/formulario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../formulario/usuario.interface';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss',
})
export class TablaComponent implements OnInit {
  usuariosRegistrados = new MatTableDataSource<Usuario>();
  columnas: string[] = [
    'nombreCompleto',
    'usuario',
    'email',
    'direccion',
    'ciudad',
    'acciones',
  ];

  constructor(
    private formularioService: FormularioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formularioService.usuariosRegistrados$.subscribe((usuarios) => {
      this.usuariosRegistrados.data = usuarios;
    });
  }
  eliminarRegistro(element: Usuario) {
    this.formularioService.eliminarUsuario(element);

    // Muestra el snackbar de éxito al eliminar un registro
    this.snackBar.open('Usuario eliminado con éxito', 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-delete'],
    });
  }
}
