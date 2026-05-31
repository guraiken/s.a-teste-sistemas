import { test, expect } from '@playwright/test';

test.describe('Fluxo de Autenticação', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navega para a página inicial (Login)
    await page.goto('/');
  });

  test('Deve falhar ao tentar cadastrar com senhas diferentes', async ({ page }) => {
    // Abre o modal de cadastro
    await page.getByText('Cadastre-se').click();

    // Escopa o formulário de cadastro para evitar colisão de IDs
    const registrationForm = page.locator('form').filter({ hasText: 'Criar Usuário' });

    // Preenche o formulário com senhas divergentes
    await registrationForm.locator('#nome').fill('Teste Integração');
    await registrationForm.locator('#email').fill('teste@integracao.com');
    await registrationForm.locator('#password').fill('12345678');
    await registrationForm.locator('#confirmPassword').fill('87654321');

    // Tenta submeter
    await registrationForm.getByRole('button', { name: 'Criar Usuário' }).click();

    // Verifica se a mensagem de erro de senha aparece
    const errorMessage = page.getByText('As senhas não correspondem');
    await expect(errorMessage).toBeVisible();
  });

  test('Deve mostrar erro ao tentar login com informações erradas', async ({ page }) => {
    // Mock da falha de login no backend
    await page.route('**/login', async route => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Credenciais inválidas' })
      });
    });

    const loginForm = page.locator('form').filter({ hasText: 'Login' });

    // Preenche campos de login
    await loginForm.locator('#email').fill('errado@teste.com');
    await loginForm.locator('#senha').fill('senhaerrada');

    // Clica em entrar
    await loginForm.getByRole('button', { name: 'Entrar' }).click();

    // Verifica se o toast de erro aparece
    const toastError = page.getByText('Credenciais inválidas');
    await expect(toastError).toBeVisible();
  });

  test('Deve realizar login com sucesso e redirecionar para o dashboard', async ({ page }) => {
    // Mock de sucesso no login
    await page.route('**/login', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            tokenAcesso: 'fake-access-token',
            tokenRefresh: 'fake-refresh-token'
          },
          message: "Login realizado com sucesso!"
        })
      });
    });

    const loginForm = page.locator('form').filter({ hasText: 'Login' });

    // Preenche campos de login corretos
    await loginForm.locator('#email').fill('admin@teste.com');
    await loginForm.locator('#senha').fill('12345678');

    // Clica em entrar
    await loginForm.getByRole('button', { name: 'Entrar' }).click();

    // Verifica redirecionamento para o dashboard
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 5000 });
    
    // Verifica se o texto do Dashboard aparece
    await expect(page.getByText('Dashboard')).toBeVisible();
  });
});
