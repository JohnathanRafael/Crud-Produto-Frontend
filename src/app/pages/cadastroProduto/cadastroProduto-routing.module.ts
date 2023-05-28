import { Routes } from '@angular/router';
import {ListProdutoComponent} from "./listProduto/listProduto.component";
import {HomeProdutoComponent} from "./homeProduto/homeProduto.component";
import {FormProdutoComponent} from "./formProduto/formProduto.component";

export const cadastroProdutoRoutes: Routes = [
  {
    path: "cadastroProduto",
    component: HomeProdutoComponent,
    children: [
      {
        path: "",
        component: ListProdutoComponent
      },
      {
        path: "novo",
        component: FormProdutoComponent
      }
    ]
  }
];

