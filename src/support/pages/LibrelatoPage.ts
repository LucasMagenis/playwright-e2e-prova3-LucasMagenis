import { Page, expect } from '@playwright/test';
import LibrelatoElements from '../elements/LibrelatoElements';
import BasePage from './BasePage';

export default class LibrelatoPage extends BasePage {
  readonly librelatoElements: LibrelatoElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.librelatoElements = new LibrelatoElements(page);
  }

  async aceitarCookies(): Promise<void> {
    const botaoAceitar = this.librelatoElements.getBotaoAceitarCookies();
    if (await botaoAceitar.isVisible({ timeout: 5000 }).catch(() => false)) {
      await botaoAceitar.click();
      await expect(botaoAceitar).toBeHidden();
    }
  }

  async validarHome(): Promise<void> {
    await expect(this.page).toHaveTitle('Librelato');
    await expect(this.librelatoElements.getTituloHome()).toBeVisible();
  }

  async abrirMenu(): Promise<void> {
    await this.librelatoElements.getBotaoAbrirMenu().click();
    await expect(this.librelatoElements.getMenuLateral()).toBeVisible();
  }

  async acessarPeloMenu(nome: string): Promise<void> {
    await this.abrirMenu();
    await this.librelatoElements.getLinkMenu(nome).click();
  }

  async validarSobre(): Promise<void> {
    await expect(this.page).toHaveURL(/\/sobre$/);
    await expect(this.page).toHaveTitle('Sobre Nós - Librelato');
    await expect(this.librelatoElements.getTituloSobre()).toBeVisible();
  }

  async validarImplementos(): Promise<void> {
    await expect(this.page).toHaveURL(/\/implementos$/);
    await expect(this.page).toHaveTitle('Implementos - Librelato');

    for (const linha of [
      'Linha Basculante',
      'Linha Graneleira',
      'Linha Tanque'
    ]) {
      await expect(
        this.librelatoElements.getLinhaDeProduto(linha)
      ).toBeVisible();
    }
  }

  async buscarPontoDeAtendimento(
    pais: string,
    estado: string,
    cidade: string
  ): Promise<void> {
    await this.librelatoElements.getSeletorPais().click();
    await this.librelatoElements.getOpcaoPais(pais).click();

    await this.librelatoElements.getSeletorEstado().click();
    await this.librelatoElements.getOpcaoEstado(estado).click();
    await expect(this.librelatoElements.getSeletorEstado()).toHaveText(estado);

    await this.librelatoElements.getSeletorCidade().click();
    await this.librelatoElements.getOpcaoCidade(cidade).click();
    await expect(this.librelatoElements.getSeletorCidade()).toHaveText(cidade);

    await this.librelatoElements.getFiltroVendas().click();
    await this.librelatoElements.getBotaoBuscar().click();
  }

  async validarPontosDeAtendimento(): Promise<void> {
    await expect(this.librelatoElements.getTituloResultados()).toBeVisible();
    await expect(this.librelatoElements.getEnderecoLoja()).toBeVisible();
  }

  async enviarFormularioVazio(): Promise<void> {
    // Garante que nenhuma mensagem real seja enviada à empresa
    await this.page.route('**/contato', route =>
      route.request().method() === 'POST' ? route.abort() : route.continue()
    );
    // A validação do formulário só é ativada após o carregamento completo
    await this.page.waitForURL(/\/contato$/);
    await this.page.waitForLoadState('load');
    await this.librelatoElements.getBotaoEnviar().click();
  }

  async validarCamposObrigatorios(): Promise<void> {
    await expect(this.page).toHaveURL(/\/contato$/);
    await expect(this.librelatoElements.getCamposComErro()).toHaveCount(8);
  }

  async trocarIdiomaParaIngles(): Promise<void> {
    await this.abrirMenu();
    await this.librelatoElements.getBotaoIdiomaIngles().click();
  }

  async validarIdiomaIngles(): Promise<void> {
    await expect(this.page).toHaveURL(/#googtrans\(pt\|en\)/);
    await expect(this.page.locator('html')).toHaveAttribute('lang', 'en');
  }
}
