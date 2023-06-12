import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ModalComponent } from './modal/modal.component';
import { ResponseModels } from './response.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public regioes: { chave: string; valor: string }[] = [
    { chave: 'Norte', valor: 'norte' },
    { chave: 'Nordeste', valor: 'nordeste' },
    { chave: 'Centro-Oeste', valor: 'centro-oeste' },
    { chave: 'Sudeste', valor: 'sudeste' },
    { chave: 'Sul', valor: 'sul' },
  ];
  public tipos: { chave: string; valor: string }[] = [
    { chave: 'Especial', valor: 'especial' },
    { chave: 'Normal', valor: 'normal' },
    { chave: 'Trabalhoso', valor: 'trabalhoso' },
  ];

  public cards: ResponseModels[] = [];

  data: any[] = [];
  pageSize = 9;
  currentPage = 0;
  totalItems = 0;
  paginaAtual = 1;
  classificacao: string | undefined;
  regiao: string | undefined;

  private url: string = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(card: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        card: card,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getData() {
    let param1 = this.classificacao
      ? `?classificacao=${this.classificacao}`
      : '';
    param1 = this.regiao ? `?region=${this.regiao}` : '';
    param1 =
      this.regiao && this.classificacao
        ? `?region=${this.regiao}&classificacao=${this.classificacao}`
        : '';

    const updatedUrl = param1.length > 0 ? this.url + param1 : this.url;
    this.http.get(updatedUrl).subscribe((res: any) => {
      this.cards = res;
      this.data = this.cards;
      this.totalItems = this.cards.length;
    });
  }

  onPageChanged(event: PageEvent) {
    this.paginaAtual = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }

  proximaPagina(paginaAtual: number) {
    this.paginaAtual = paginaAtual;
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  limpar() {
    this.classificacao = undefined;
    this.regiao = undefined;
    this.getData();
  }
}
