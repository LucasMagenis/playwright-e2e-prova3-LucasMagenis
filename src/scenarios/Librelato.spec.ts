import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import LibrelatoPage from '../support/pages/LibrelatoPage';

test.describe('Site institucional da Librelato', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let librelatoPage: LibrelatoPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.librelato')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    librelatoPage = new LibrelatoPage(page);
    await page.goto(BASE_URL);
    await librelatoPage.aceitarCookies();
  });

  test('Validar carregamento da página inicial', async () => {
    await librelatoPage.validarHome();
  });

  test('Navegar até a página Sobre nós pelo menu', async () => {
    await librelatoPage.acessarPeloMenu('Sobre nós');
    await librelatoPage.validarSobre();
  });

  test('Navegar até Implementos e validar as linhas de produtos', async () => {
    await librelatoPage.acessarPeloMenu('Implementos');
    await librelatoPage.validarImplementos();
  });

  test('Buscar ponto de atendimento em Criciúma - SC', async () => {
    await librelatoPage.acessarPeloMenu('Rede de atendimento');
    await librelatoPage.buscarPontoDeAtendimento(
      'Brasil',
      'Santa Catarina',
      'Criciúma'
    );
    await librelatoPage.validarPontosDeAtendimento();
  });

  test('Enviar formulário de contato sem preencher os campos obrigatórios', async () => {
    await librelatoPage.acessarPeloMenu('Contato');
    await librelatoPage.enviarFormularioVazio();
    await librelatoPage.validarCamposObrigatorios();
  });

  test('Trocar o idioma do site para inglês', async () => {
    await librelatoPage.trocarIdiomaParaIngles();
    await librelatoPage.validarIdiomaIngles();
  });
});