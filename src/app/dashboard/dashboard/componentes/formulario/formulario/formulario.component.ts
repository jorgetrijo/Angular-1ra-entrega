import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormularioService } from '../../../../../services/formulario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Usuario } from '../usuario.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss',
})
export class FormularioComponent implements OnInit {
  hide = true;
  datosPersonales = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', Validators.required],
    usuario: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required, Validators.minLength(6)]],
  });

  ubicacion = this.formBuilder.group({
    direccion: ['', Validators.required],
    ciudad: ['', Validators.required],
  });

  isLinear = true;
  columnas: string[] = [
    'nombreCompleto',
    'usuario',
    'email',
    'direccion',
    'ciudad',
    'acciones',
  ];
  usuariosRegistrados = new MatTableDataSource<any>();
  mensajeError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormularioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formularioService.usuariosRegistrados$.subscribe((usuarios) => {
      this.usuariosRegistrados.data = usuarios;
    });
  }

  getErrors(formControlName: string): ValidationErrors | null | undefined {
    return this.datosPersonales.get(formControlName)?.errors;
  }

  guardarInformacionEnServicio(stepper: MatStepper) {
    this.mensajeError = null;

    const formularios = [this.datosPersonales, this.ubicacion];

    // Verifica si algún formulario es inválido
    if (formularios.some((form) => form.invalid)) {
      this.mensajeError =
        'Todos los campos son obligatorios. Complete la información faltante.';
      this.mostrarSnackBarError(this.mensajeError);

      // Vuelve al primer paso del stepper
      stepper.selectedIndex = 0;
      return;
    }

    const informacionCompleta: Usuario = {
      nombre: this.datosPersonales.value.nombre ?? '',
      apellido: this.datosPersonales.value.apellido ?? '',
      usuario: this.datosPersonales.value.usuario ?? '',
      email: this.datosPersonales.value.email ?? '',
      contraseña: this.datosPersonales.value.contraseña ?? '',
      direccion: this.ubicacion.value.direccion ?? '',
      ciudad: this.ubicacion.value.ciudad ?? '',
    };

    // Verifica duplicados
    if (this.esUsuarioDuplicado(informacionCompleta)) {
      this.mostrarSnackBarError(
        'Usuario y/o email ya existen. Elija otros datos.'
      );

      // Vuelve al primer paso del stepper
      stepper.selectedIndex = 0;
      return;
    }

    this.formularioService.agregarUsuario(informacionCompleta);

    // Resetea formularios y elimina mensajes de error
    formularios.forEach((form) => {
      form.reset();
      form.markAsUntouched();
    });

    this.mostrarSnackBarSuccess('Usuario creado con éxito');
    stepper.selectedIndex = 0;
  }

  esUsuarioDuplicado(usuario: Usuario): boolean {
    return this.formularioService
      .obtenerUsuarios()
      .some((u) => u.usuario === usuario.usuario || u.email === usuario.email);
  }

  mostrarSnackBarSuccess(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-success'],
    });
  }

  mostrarSnackBarError(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-error'],
    });
  }
  eliminarRegistro(element: any) {
    this.formularioService.eliminarUsuario(element);

    // Muestra el snackbar de éxito al eliminar un registro
    this.snackBar.open('Usuario eliminado con éxito', 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-delete'],
    });

    // Actualiza la fuente de datos de la tabla
    this.usuariosRegistrados.data = this.formularioService.obtenerUsuarios();
    this.usuariosRegistrados._updateChangeSubscription();
  }
}
