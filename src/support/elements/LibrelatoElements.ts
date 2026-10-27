import { FrameLocator, Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class LibrelatoElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getBotaoAceitarCookies(): Locator {
    return this.page.getByRole('button', { name: 'Aceitar', exact: true });
  }

  getTituloHome(): Locator {
    return this.page.getByRole('heading', { name: 'Inspirado nas estradas.' });
  }

  getBotaoAbrirMenu(): Locator {
    return this.page.locator('a.open-menu').first();
  }

  getMenuLateral(): Locator {
    return this.page.locator('.wrap-menu-mobile');
  }

  getLinkMenu(nome: string): Locator {
    return this.getMenuLateral().getByRole('link', { name: nome, exact: true });
  }

  getBotaoIdiomaIngles(): Locator {
    return this.getMenuLateral().getByRole('button', { name: 'Inglês' });
  }

  getTituloSobre(): Locator {
    return this.page.getByRole('heading', { name: 'A gente faz para durar.' });
  }

  getLinhaDeProduto(nome: string): Locator {
    return this.page.getByRole('heading', { name: nome, exact: true });
  }

  // Filtro da Rede de Atendimento (selects customizados)
  getSeletorPais(): Locator {
    return this.page.locator('#div-paises .pais-selecionado');
  }

  getOpcaoPais(pais: string): Locator {
    return this.page.locator('#div-paises li', { hasText: pais });
  }

  getSeletorEstado(): Locator {
    return this.page.locator('#div-estados .estado-selecionado');
  }

  getOpcaoEstado(estado: string): Locator {
    return this.page.locator('#estados-ul li', { hasText: estado });
  }

  getSeletorCidade(): Locator {
    return this.page.locator('#div-cidades .cidade-selecionado');
  }

  getOpcaoCidade(cidade: string): Locator {
    return this.page.locator('#cidades-ul li').getByText(cidade, {
      exact: true
    });
  }

  getFiltroVendas(): Locator {
    return this.page.locator('#t-distribuidor');
  }

  getBotaoBuscar(): Locator {
    return this.page.getByRole('button', { name: 'Buscar' });
  }

  getResultadoBusca(): FrameLocator {
    return this.page.frameLocator('iframe[src*="representantes-disponiveis"]');
  }

  getTituloResultados(): Locator {
    return this.getResultadoBusca().getByRole('heading', {
      name: 'Pontos de atendimento disponíveis'
    });
  }

  getEnderecoLoja(): Locator {
    return this.getResultadoBusca().getByText('Endereço - Loja').first();
  }

  // Formulário de contato
  getFormularioContato(): Locator {
    return this.page.locator('form.contact-form');
  }

  getBotaoEnviar(): Locator {
    return this.getFormularioContato().getByRole('button', {
      name: 'Enviar'
    });
  }

  getCamposComErro(): Locator {
    return this.getFormularioContato().locator('.form-group.form-error');
  }
}
