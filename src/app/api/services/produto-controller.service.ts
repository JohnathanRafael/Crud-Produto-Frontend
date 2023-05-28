/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ProdutoDto } from '../models/produto-dto';
import { ProdutoDadosAlterarDto } from '../models/produto-dados-alterar-dto';
import { ProdutoListaDto } from '../models/produto-lista-dto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation obterPorCodigo
   */
  static readonly ObterPorCodigoPath = '/api/v1/produto/{produtoCodigo}';

  /**
   * Método utilizado para obter todos os dados de um produto por codigo
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obterPorCodigo()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorCodigo$Response(params: {
    produtoCodigo: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ProdutoDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProdutoControllerService.ObterPorCodigoPath, 'get');
    if (params) {
      rb.path('produtoCodigo', params.produtoCodigo, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProdutoDto>;
      })
    );
  }

  /**
   * Método utilizado para obter todos os dados de um produto por codigo
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obterPorCodigo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorCodigo(params: {
    produtoCodigo: number;
  },
  context?: HttpContext

): Observable<ProdutoDto> {

    return this.obterPorCodigo$Response(params,context).pipe(
      map((r: StrictHttpResponse<ProdutoDto>) => r.body as ProdutoDto)
    );
  }

  /**
   * Path part for operation alterar
   */
  static readonly AlterarPath = '/api/v1/produto/{produtoCodigo}';

  /**
   * Método utilizado para realizar a alteracao dos dados de um produto
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar$Response(params: {
    produtoCodigo: number;
    body: ProdutoDadosAlterarDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ProdutoDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProdutoControllerService.AlterarPath, 'put');
    if (params) {
      rb.path('produtoCodigo', params.produtoCodigo, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProdutoDto>;
      })
    );
  }

  /**
   * Método utilizado para realizar a alteracao dos dados de um produto
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar(params: {
    produtoCodigo: number;
    body: ProdutoDadosAlterarDto
  },
  context?: HttpContext

): Observable<ProdutoDto> {

    return this.alterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<ProdutoDto>) => r.body as ProdutoDto)
    );
  }

  /**
   * Path part for operation remover
   */
  static readonly RemoverPath = '/api/v1/produto/{produtoCodigo}';

  /**
   * Método utilizado para realizar a exclusao de um produto
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `remover()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover$Response(params: {
    produtoCodigo: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ProdutoDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProdutoControllerService.RemoverPath, 'delete');
    if (params) {
      rb.path('produtoCodigo', params.produtoCodigo, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProdutoDto>;
      })
    );
  }

  /**
   * Método utilizado para realizar a exclusao de um produto
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `remover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover(params: {
    produtoCodigo: number;
  },
  context?: HttpContext

): Observable<ProdutoDto> {

    return this.remover$Response(params,context).pipe(
      map((r: StrictHttpResponse<ProdutoDto>) => r.body as ProdutoDto)
    );
  }

  /**
   * Path part for operation listAll
   */
  static readonly ListAllPath = '/api/v1/produto';

  /**
   * Listagem geral de produtos
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProdutoListaDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProdutoControllerService.ListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProdutoListaDto>>;
      })
    );
  }

  /**
   * Listagem geral de produtos
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll(params?: {
  },
  context?: HttpContext

): Observable<Array<ProdutoListaDto>> {

    return this.listAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProdutoListaDto>>) => r.body as Array<ProdutoListaDto>)
    );
  }

  /**
   * Path part for operation incluir
   */
  static readonly IncluirPath = '/api/v1/produto';

  /**
   * Método utilizado para realizar a inclusao de um produto
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir$Response(params: {
    body: ProdutoDadosAlterarDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ProdutoDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProdutoControllerService.IncluirPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProdutoDto>;
      })
    );
  }

  /**
   * Método utilizado para realizar a inclusao de um produto
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `incluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir(params: {
    body: ProdutoDadosAlterarDto
  },
  context?: HttpContext

): Observable<ProdutoDto> {

    return this.incluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<ProdutoDto>) => r.body as ProdutoDto)
    );
  }

}
