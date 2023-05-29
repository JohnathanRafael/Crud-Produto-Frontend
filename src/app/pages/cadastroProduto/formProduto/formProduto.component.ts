import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ProdutoControllerService} from "../../../api/services/produto-controller.service";
import {ProdutoDto} from "../../../api/models/produto-dto";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageResponse} from "../../../api/models/message-response";

@Component({
  selector: 'app-formProduto',
  templateUrl: './formProduto.component.html',
  styleUrls: ['./formProduto.component.scss']
})
export class FormProdutoComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "INCLUIR";
  public readonly ACAO_ALTERAR = "ALTERAR";

  acao : string = this.ACAO_INCLUIR;
  private codigo !: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public produtoService: ProdutoControllerService,
    private dialog: MatDialog,
  ) {
    this.createForm();
    this.prepararEdicao();
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
      if (!this.codigo) {
        this.realizarInclusao();
      } else {
        this.realizarEdicao()
      }
    }
  }

  private realizarInclusao() {
    if (this.formGroup.valid) {
      console.log("Dados:", this.formGroup.value);
      this.produtoService.incluir({body: this.formGroup.value})
        .subscribe(retorno => {
          console.log("Retorno:", retorno);
          this.confirmarAcao(retorno, this.ACAO_INCLUIR);
          this.atualizar();
        }, erro => {
          console.log("Erro:" + erro);
          this.showError(erro.error, this.ACAO_INCLUIR);
        })
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  confirmarAcao(ProdutoDto: ProdutoDto, acao:String) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Sucesso',
        mensagem: `Ação de ${acao} dados: ${ProdutoDto.produtoNome} (ID: ${ProdutoDto.produtoCodigo}) realizada com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });

  }

  showError(erro:MessageResponse, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: `Erro ao ${acao}`,
        mensagem: erro.message,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });

  }

  private prepararEdicao() {
    const paramCodigo = this.route.snapshot.paramMap.get('produtoCodigo');
    if (paramCodigo) {
      const codigo = parseInt(paramCodigo);
      console.log("codigo", paramCodigo);
      this.produtoService.obterPorCodigo({produtoCodigo: codigo}).subscribe(
        retorno => {
          this.acao = this.ACAO_ALTERAR;
          console.log("retorno", retorno);
          this.codigo = retorno.produtoCodigo || 0;
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }
  private realizarEdicao() {
    this.produtoService.alterar({produtoCodigo: this.codigo, body: this.formGroup.value})
      .subscribe(retorno => {
        this.confirmarAcao(retorno, this.ACAO_ALTERAR);
        this.atualizar();
      }, erro => {
        this.showError(erro.error, this.ACAO_ALTERAR);
      })
  }

  atualizar() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/home/cadastroProduto');
    });
  }


}
