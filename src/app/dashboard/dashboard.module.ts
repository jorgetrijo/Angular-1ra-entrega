import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormularioComponent } from './dashboard/componentes/formulario/formulario/formulario.component';
import { TablaComponent } from './dashboard/componentes/tabla/tabla/tabla.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NombreCompletoPipe } from './dashboard/componentes/tabla/pipes/nombre-completo.pipe';
import { TamañoLetraDirective } from './dashboard/directives/tamaño-letra.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    FormularioComponent,
    TablaComponent,
    NombreCompletoPipe,
    TamañoLetraDirective
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatTableModule,
    MatSnackBarModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
