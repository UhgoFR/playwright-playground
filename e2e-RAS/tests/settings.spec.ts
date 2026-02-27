import { test ,expect} from '@playwright/test';
import { AuthPage } from "../pages/authPage";
import { HomePage } from '../pages/homePage';
import { SetthingsPage } from '../pages/settingsPage';

(async ()=>{

    test.beforeEach(async ({ page }) => {
        
        await test.step('Navegar al RAS (Release Automation System)', async () => {
          const auth = new AuthPage(page);
            await auth.goto();
            await page.context().clearCookies();
            await page.evaluate(() => {
                localStorage.clear();
                sessionStorage.clear();
            });
            await auth.signIn('it@ras.com');
        });
        
    });

    test.describe('Settings', () => {

        test.describe('Calendar', () => {

             test('Debería permitir agregar una categoría en el calendario', async ({ page }) => {
                const home = new HomePage(page);
                const setthings = new SetthingsPage(page);

                await test.step('Ir a settings', async () => {
                    await home.clickSettings();                   
                })

                await test.step('Validar elementos de setthings - Calendar', async () => {
                    await expect (setthings.calendarHeading).toBeVisible();
                    await expect (setthings.categoryNameText).toBeVisible();
                    await expect (setthings.categoryDescriptionText).toBeVisible();
                    await expect (setthings.colorCategoryText).toBeVisible();                  
                })

                await test.step('Ingresar el nombre de la categoría', async () => {
                    await setthings.fillCategoryName('E2E');
                })

                await test.step('Ingresar la decripción de la categoría', async () => {
                    await setthings.fillCategoryDescription('Pruebas');
                })

                await test.step('Seleccionar color de la categoría', async () => {
                    await setthings.clickColorCategory();
                    await setthings.clickSelectColor('#43A047');
                    await setthings.clickCloseButton();
                })

                await test.step('Guardar Categoría', async () => {
                    await setthings.clickSaveCategory();
                })

                await test.step('Validar mensaje de éxito', async () => {
                    await expect (setthings.getMessageText('Category created successfully')).toBeVisible();
                })

                await test.step('Click en ver más registros', async () => {
                    await setthings.clickViewMore();
                })
                
                await test.step('Validar registro en la tabla', async () => {
                    await expect(setthings.rowsCalendarTable).toContainText(['E2E']);  
                })
                            
            })

            test('Debería permitir editar una catagoría del calendario', async ({ page }) => {
                const home = new HomePage(page);
                const setthings = new SetthingsPage(page);

                await test.step('Ir a settings', async () => {
                    await home.clickSettings(); 
                })
                
                await test.step('Click en ver más registros', async () => {
                    await setthings.clickViewMore();
                })

                await test.step('Seleccionar registro a editar dando click al botón [Editar]', async () => {
                    await setthings.clickButtonInRowByNameCalendar('E2E Pruebas');
                })

                await test.step('Ingresar el nombre de la categoría', async () => {
                    await setthings.fillCategoryName('End to End Testing');
                })

                await test.step('Ingresar la decripción de la categoría', async () => {
                    await setthings.fillCategoryDescription('Pruebas de extremo a extremo');
                })

                await test.step('Seleccionar color de la categoría', async () => {
                    await setthings.clickColorCategory();
                    await setthings.clickSelectColor('#F4511E');
                    await setthings.clickCloseButton();
                })

                await test.step('Guardar Categoría', async () => {
                    await setthings.clickUpdateCategoryButton();
                })

                await test.step('Validar mensaje de éxito', async () => {
                    await expect (setthings.getMessageText('Category updated successfully')).toBeVisible();
                })

                await test.step('Validar registro en la tabla', async () => {
                    await expect(setthings.rowsCalendarTable).toContainText(['End to End Testing']);  
                })                
                
            })

            test('Debería permitir eliminar una categoría del calendario', async ({ page }) => {
                
                const home = new HomePage(page);
                const setthings = new SetthingsPage(page);

                await test.step('Ir a settings', async () => {
                    await home.clickSettings(); 
                })
                
                await test.step('Click en ver más registros', async () => {
                    await setthings.clickViewMore();
                })

                await test.step('Seleccionar registro a eliminar dando click al botón [Editar]', async () => {
                    await setthings.clickButtonInRowByNameCalendar('End to End Testing',1);
                })

                await test.step('Marcar que si deseamos eliminar', async () => {
                    await setthings.checkConfirmCategoryDelete();
                })

                await test.step('Eleminar Categoría', async () => {
                    await setthings.clickConfirmDelete();
                })
                
                await test.step('Validar mensaje de éxito', async () => {
                    await expect (setthings.getMessageText('Category deleted successfully')).toBeVisible();
                })            

                await test.step('Validar que el registro no exista en la tabla', async () => {
                    await expect(setthings.rowsCalendarTable).toHaveCount(9); 
                })  

            })
    
            test('NO debería permitir agregar una categoría con campos vacios  ', async ({ page }) => {
                const home = new HomePage(page);
                const setthings = new SetthingsPage(page);

                await test.step('Ir a settings', async () => {
                    await home.clickSettings(); 
                })

                await test.step('Ingresar el nombre de la categoría', async () => {
                    await setthings.fillCategoryName('');
                })

                await test.step('Ingresar la decripción de la categoría', async () => {
                    await setthings.fillCategoryDescription('');
                })

                await test.step('Guardar Categoría', async () => {
                    await setthings.clickSaveCategory();
                })

                await test.step('Validar Mensajes de error', async () => {
                    await expect(setthings.getMessageText('Category Name is required')).toBeVisible();
                    await expect(setthings.getMessageText('Description is required')).toBeVisible();                    
                })

                await test.step('Click en ver más registros', async () => {
                    await setthings.clickViewMore();
                })

                await test.step('Validar que solo existan los registros definidos en la tabla del calendario', async () => {
                    await expect(setthings.rowsCalendarTable).toHaveCount(9); 
                })                

            })           
            
        })

        test.describe('PODS', () => {

            test('Debería permitir agregar un POD', async ({ page }) => {
                test.info().annotations.push({ type: 'Objetivo', description: 'Validar que se permita agregar un POD' });
                const home = new HomePage(page);
                const setthings = new SetthingsPage(page);              

                await test.step('Ir a settings', async () => {
                    await home.clickSettings();                  
                })

                await test.step('Validar los elementos de setthings - PODS', async () => {
                    await expect(setthings.podsHeading).toBeVisible();
                    await expect(setthings.projectText) .toBeVisible();
                    await expect(setthings.namePodsText).toBeVisible();
                    await expect(setthings.boardUrlText).toBeVisible();
                    await expect(setthings.membersText).toBeVisible();                
                })

                await test.step('Seleccionar proyecto de jira', async () => {
                    await setthings.selectProject('[PLUS]Basics');
                })

                await test.step('Ingresar nombre del POD', async () => {
                    await setthings.fillPodName('CheckOut');
                })
                
                await test.step('Ingresar URL del Board del proyecto de Jira', async () => {
                    await setthings.fillBoardUrl('https://digitalfemsa.atlassian.net/jira/software/c/projects/PF/boards/1104');
                })

                await test.step('Seleccionar Miembros', async () => {
                    await setthings.clickMembersCombobox();
                    await setthings.selectMemberOption('Alan Neri');
                    await setthings.selectMemberOption('Alberto Botello');
                    await page.locator('body').click();
                })

                await test.step('Añadir POD', async () => {
                    await setthings.clickAddPod();
                })
                
                await test.step('Validar mensaje de éxito', async () => {
                    await expect (setthings.getMessageText('Pod Registered.')).toBeVisible();
                })

                await test.step('Validar registro en la tabla', async () => {
                    await expect(setthings.rowsPodTable).toContainText(['CheckOut']);  
                })  
                
            })

            test('Debería permitir actualizar un POD', async ({ page }) => {
                test.info().annotations.push({ type: 'Objetivo', description: 'Validar que se permita actualizar un POD' });
                const home = new HomePage(page);
                const setthings = new SetthingsPage(page);              

                await test.step('Ir a settings', async () => {
                    await home.clickSettings();                  
                })
                
                await test.step('Seleccionar el POD a editar', async () => {
                    await setthings.clickTableButtonInfoPod(19,3);                   
                })

                await test.step('Click a editar', async () => {
                    await setthings.clickUpdatePod();
                })

                await test.step('Editar campos', async () => {
                    await setthings.selectProjectInEdit('SuperAPP');
                    await setthings.fillPodName('Release Train');
                    await setthings.fillBoardUrl('https://digitalfemsa.atlassian.net/jira/software/c/projects/SUP/boards/621');
                    await setthings.clickMembersEdit();
                    await setthings.selectMemberInEditModalByText('Edher Noriega');
                    await page.locator('body').click();
                    await setthings.clickDeleteReviewByName('Alan Neri -:');
                })
                
                await test.step('Guardar Cambios', async () => {
                    await setthings.clickSaveChanges();
                })

                await test.step('Validar mensaje de éxito de update', async () => {
                    await expect (setthings.getMessageText('Pod Updated.')).toBeVisible();
                })
                                
            })
                                  
        })
           
    })
    
    test.afterEach(async ({page,context }) => {
        //await context.close();
        //await page.close();
    }); 

})();