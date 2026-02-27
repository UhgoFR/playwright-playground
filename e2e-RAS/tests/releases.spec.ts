import { test ,expect} from '@playwright/test';
import { AuthPage } from "../pages/authPage";
import { HomePage } from '../pages/homePage';
import { ReleasesPage } from '../pages/releasesPage';

(async ()=>{

    test.beforeEach(async ({ page }) => {
        const auth = new AuthPage(page);
        await auth.goto();
        await auth.signIn('it@ras.com');
        
    })

    test.describe('Releases', () => {

        test.describe('Release List', () => {
            
            test('Debería permitir añadir un nuevo release', async ({ page }) => {
                test.info().annotations.push({ type: 'Objetivo', description: 'Validar que el sistema permita añadir un nuevo release' });
                const home = new HomePage(page);
                const release = new ReleasesPage(page);

                await test.step('Ir a release List', async () => {
                    await home.clickRelease();
                    await home.clickReleaseList();                
                })

                await test.step('Click a añadir a un nuevo release', async () => {
                    await release.clickAddNewRelease();
                    
                })

                await test.step('Validar elementos de create releases', async () => {
                    await expect(release.createReleaseHeading,'No es visible el elemento').toBeVisible();
                    await expect(release.nameText,'No es visible el elemento').toBeVisible();
                    await expect(release.versionText,'No es visible el elemento').toBeVisible();
                    await expect(release.startDateText,'No es visible el elemento').toBeVisible();
                    await expect(release.endDateText,'No es visible el elemento').toBeVisible();
                    await expect(release.colorCategoryText,'No es visible el elemento').toBeVisible();
                    await expect(release.descriptionNotesText,'No es visible el elemento').toBeVisible(); 
                })

                await test.step('Crear un nuevo release', async () => {
                    await release.fillNameRelease('July 3rd');
                    await release.fillVersionRelease('25.7.3');
                    await release.fillStartDateRelease('2025-07-24');
                    await release.fillEndDateRelease('2025-08-07');
                    await release.clickColorCategory();
                    await release.clickSelectColor('#689F38');
                    await release.clickCloseButton();
                    await release.fillDescriptionNotes('Playwright Testing');
                    await release.clickSaveRelease();
                })

                await test.step('Comprobar la creación del release', async () => {
                    await expect(release.getMessageText('Release created.'),'El elemento no es visible').toBeVisible();
                    await expect(release.releaseInformationHeading,'El elemento no es visible').toBeVisible();
                })           
                
            })

            test('Debería permitir editar información de un release', async ({ page }) => {
                test.info().annotations.push({ type: 'Objetivo', description: 'Validar que el sistema permita editar un release' });
                const home = new HomePage(page);
                const release = new ReleasesPage(page);

                await test.step('Ir a release List', async () => {
                    await home.clickRelease();
                    await home.clickReleaseList();
                })

                await test.step('Navegar a la pagina del release', async () => {
                    await release.clickNext();
                    await release.clickNext();
                })

                await test.step('Seleccionar release a editar dando clic a [View Details]', async () => {
                    await release.clickViewDetailsRelease('25.7.3');
                })
                
                await test.step('Click a [Edit Release]', async () => {
                    await release.clickEditRelease();
                })

                await test.step('Validar elementos que sean editables y no editables', async () => {
                    await expect(release.nameReleaseTextbox).not.toBeEditable();
                    await expect(release.versionReleaseTextbox).not.toBeEditable();
                    await expect(release.gitBranchTextbox).not.toBeEditable();
                    await expect(release.startDateReleaseTextbox).toBeEditable();
                    await expect(release.endDateText).toBeEditable();
                    await expect(release.colorCategoryReleaseButton).toBeVisible();
                })

                await test.step('Editar Release', async () => {
                    await release.fillStartDateRelease('2025-07-24');
                    await release.fillEndDateRelease('2025-08-06');
                    await release.toggleSlackNotifications();
                })

                await test.step('Actualizar release', async () => {
                    await release.clickUpdateRelease();
                })

                await test.step('Comprobar la actualización del release', async () => {
                    await expect(release.getMessageText('Update Successful'),'El elemento no es visible').toBeVisible();
                })
                
                
                
            })
            
            
        })
        
        
    })
    
    
    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
        await page.close();
    })

})();