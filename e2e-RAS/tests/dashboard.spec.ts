import { test ,expect} from '@playwright/test';
import { AuthPage } from "../pages/authPage";
import { DashboardPage } from '../pages/dashboardPage';

(async ()=>{

    test.beforeEach(async ({ page }) => {
        const auth = new AuthPage(page);
        await auth.goto();
        await auth.signIn('it@ras.com');
    })

    test.describe('Dashboard', () => {

        test('Debería permitir mostrar la información del release vigente', async ({ page }) => {
            const dashboard = new DashboardPage(page);
            test.info().annotations.push({ type: 'Objetivo', description: 'Validar que se muestre información del release vigente en el dashboard' });

           
            await test.step('Validar la información del release vigente en el dashboard', async () => {
                await expect(dashboard.passengers).toHaveCount(1);
                await expect(dashboard.tickets).toHaveCount(1);           
            })

             await test.step('Validar que el carrusel muestre la selección del release vigente', async () => {
                await expect(dashboard.releasecarousel,'El release vigente no está seleccionado').toHaveClass(/selected/);
            })
            
            await test.step('Validar participantes del release', async () => {
                await expect(dashboard.participantsRelease).toContainText('tr_mioxxo');
            })
                       
        })
              
    })

    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
        await page.close();
    })

})();