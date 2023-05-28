import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProdutoComponent } from './listProduto/listProduto.component';
import {RouterModule} from "@angular/router";
import {cadastroProdutoRoutes} from "./cadastroProduto-routing.module";
import { HomeProdutoComponent } from './homeProduto/homeProduto.component';
import { FormProdutoComponent } from './formProduto/formProduto.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    ListProdutoComponent,
    HomeProdutoComponent,
    FormProdutoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(cadastroProdutoRoutes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class CadastroProdutoModule { }
