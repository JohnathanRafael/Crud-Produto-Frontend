import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ProdutoControllerService} from "../../../api/services/produto-controller.service";
import {ProdutoDto} from "../../../api/models/produto-dto";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-formProduto',
  templateUrl: './formProduto.component.html',
  styleUrls: ['./formProduto.component.scss']
})
export class FormProdutoComponent {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public produtoService: ProdutoControllerService,
    private dialog: MatDialog,
  ) {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      produtoNome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(75)]],
      produtoMarca: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      produtoCategoria: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      produtoValorVenda: [null, [Validators.required]],
      produtoValorCusto: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log("Dados:",this.formGroup.value);
      this.produtoService.incluir({body: this.formGroup.value})
        .subscribe( retorno =>{
          console.log("Retorno:",retorno);
          this.confirmarInclusao(retorno);
        }, erro =>{
          console.log("Erro:"+erro);
          this.falhaInclusao(erro);
        })
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  confirmarInclusao(ProdutoDto: ProdutoDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Sucesso',
        mensagem: `Inclusão de: ${ProdutoDto.produtoNome} (ID: ${ProdutoDto.produtoCodigo}) realizada com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });

  }

  falhaInclusao(ProdutoDto: ProdutoDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Falha',
        mensagem: `Houve um erro no momento da inclusão`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });

  }

}
