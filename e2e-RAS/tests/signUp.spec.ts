import { test, expect } from '@playwright/test';
import { AuthPage } from "../pages/authPage";
import { HomePage } from '../pages/homePage';
import {getRandomUser} from "../utils/generators"

(async ()=>{

    test.beforeEach(async ({ page }) => {
        const auth = new AuthPage(page);
        await test.step('Navegar a RAS (Release Automation System)', async () => {
            await auth.goto();
            await page.context().clearCookies();
            await page.evaluate(() => {
                localStorage.clear();
                sessionStorage.clear();
            });
        });
    })

    test.describe('Formulario de registro de usuario', () => {

        test('Debería permitir registrar un usuario de TI con datos válidos', async ({ page }) => {
            const auth = new AuthPage(page);
            const home = new HomePage(page);
            const {email,firstName,lastName,photoUrl} = getRandomUser();
           
            await test.step('Continuar registro con email', async () => {
                const popup = await auth.openSamlPopup();
                const popupSignin = new AuthPage(popup);
                await test.step('Validar que todos los elementos del PopUp esten visibles', async () => {
                    await expect(popupSignin.signInWithSamlText,'El popup, no es visible').toBeVisible();
                    await expect(popupSignin.addNewAccountButton,'El botón "Añadir cuenta", no es visible').toBeVisible();
                });

                await test.step('Añadir una nueva cuenta', async () => {
                    await popupSignin.clickAddNewAccount();
                })
                
                await test.step('Llenar formulario de registro de usuario', async () => {                    
                    await popupSignin.fillEmail(email);
                    await popupSignin.fillDisplayName(firstName);
                    await popupSignin.fillScreenName(lastName);
                    await popupSignin.fillProfilePhotoUrl(photoUrl);
                })

                await test.step('Crear usuario', async () => {
                    await popupSignin.clickSignInWithSamRas();
                    
                })                                
                
            })
          
            await test.step('Finalizar registro eligiendo rol de TI', async () => {
               
                await test.step('Validar elementos de selección de rol', async () => {
                    await expect (home.welcomeToRasText,'El elemento "Welcome to RAS", no es visible').toBeVisible();
                    await expect (home.beforeContinuingPleaseText,'El elemento "Before Continuing Please",No es visible').toBeVisible();
                    await expect (home.itButton,'El botón "IT", no es visible').toBeVisible();
                    await expect (home.productButton,'El botón "Product", no es visible').toBeVisible();
                })

             
               await test.step('Selección de rol', async () => {
                    await auth.selectApp('Spin Premia');
                    await home.clickIt();
                    await home.selectPositionRole('IC1');
                    await home.clickContinueButton();
                })
                           
                
            })
                                  
        })

        test('Debería permitir registrar un usuario de Producto con datos válidos', async ({ page }) => {
            const auth = new AuthPage(page);
            const home = new HomePage(page);
            const {email,firstName,lastName,photoUrl} = getRandomUser();
          
            await test.step('Continuar registro con email', async () => {
                const popup = await auth.openSamlPopup();
                const popupSignin = new AuthPage(popup);
                await test.step('Validar que todos los elementos del PopUp esten visibles', async () => {
                    await expect(popupSignin.signInWithSamlText,'El popup, no es visible').toBeVisible();
                    await expect(popupSignin.addNewAccountButton,'El botón "Añadir cuenta", no es visible').toBeVisible();
                });

                await test.step('Añadir una nueva cuenta', async () => {
                    await popupSignin.clickAddNewAccount();
                })
                
                await test.step('Llenar formulario de registro de usuario', async () => {                    
                    await popupSignin.fillEmail(email);
                    await popupSignin.fillDisplayName(firstName);
                    await popupSignin.fillScreenName(lastName);
                    await popupSignin.fillProfilePhotoUrl(photoUrl);
                })

                await test.step('Crear usuario', async () => {
                    await popupSignin.clickSignInWithSamRas();
                    
                })                                
                
            })

            await test.step('Finalizar registro eligiendo rol de TI', async () => {
               
                await test.step('Selección de rol', async () => {
                    await auth.selectApp('Spin Premia');
                    await home.clickIt();
                    await home.selectPositionRole('IC1');
                    await home.clickContinueButton();
                })           
                
            })                 
            
        })        
        
        test('Debería permitir registrar un usuario con función de Auto-Completado', async ({ page }) => {
            const auth = new AuthPage(page);

            await test.step('Continuar registro con email', async () => {
                const popup = await auth.openSamlPopup();
                const popupSignin = new AuthPage(popup);
                await test.step('Validar que todos los elementos del PopUp esten visibles', async () => {
                    await expect(popupSignin.signInWithSamlText,'El popup, no es visible').toBeVisible();
                    await expect(popupSignin.addNewAccountButton,'El botón "Añadir cuenta", no es visible').toBeVisible();
                });

                await test.step('Añadir una nueva cuenta', async () => {
                    await popupSignin.clickAddNewAccount();
                })
                
                await test.step('Llenar formulario con función de Auto-Completado', async () => {                    
                    await popupSignin.clickAutoGenerateUserInformation();
                })

                await test.step('Crear usuario', async () => {
                    await popupSignin.clickSignInWithSamRas();
                    
                })                                
                
            })               
            
        }) 
        
        test('Debería permitir registrar un usuario solo con email', async ({ page }) => {
            const auth = new AuthPage(page);
            const {email} = getRandomUser();  
            await test.step('Continuar registro con email', async () => {
                const popup = await auth.openSamlPopup();
                const popupSignin = new AuthPage(popup);
                await test.step('Validar que todos los elementos del PopUp esten visibles', async () => {
                    await expect(popupSignin.signInWithSamlText,'El popup, no es visible').toBeVisible();
                    await expect(popupSignin.addNewAccountButton,'El botón "Añadir cuenta", no es visible').toBeVisible();
                });

                await test.step('Añadir una nueva cuenta', async () => {
                    await popupSignin.clickAddNewAccount();
                })
                
                await test.step('Llenar formulario solo con email', async () => {                    
                    await popupSignin.fillEmail(email);
                })

                await test.step('Crear usuario', async () => {
                    await popupSignin.clickSignInWithSamRas();
                    
                })                                
                
            })               
            
        })
        
        test('No debería permitir registrar un usuario sin email', async ({ page }) => {
            const auth = new AuthPage(page);
            
            await test.step('Continuar registro con email', async () => {
                const popup = await auth.openSamlPopup();
                const popupSignin = new AuthPage(popup);
                await test.step('Validar que todos los elementos del PopUp esten visibles', async () => {
                    await expect(popupSignin.signInWithSamlText,'El popup, no es visible').toBeVisible();
                    await expect(popupSignin.addNewAccountButton,'El botón "Añadir cuenta", no es visible').toBeVisible();
                });

                await test.step('Añadir una nueva cuenta', async () => {
                    await popupSignin.clickAddNewAccount();
                })
                
                await test.step('Crear usuario', async () => {
                    await popupSignin.clickSignInWithSamRas();
                    
                })
                
                await test.step('Validar mensaje de error por email', async () => {
                    await popupSignin.getMessageText('Email required');
                    
                })
                await test.step('Validar deshabiltación del botón [SignInWithSamRas]', async () => {
                    await expect(popupSignin.singInwithSamRasButton).toBeDisabled();
                })                
                
            })               
            
        })
        
        test('No debería permitir registrar un usuario solo con datos opcionales', async ({ page }) => {
            const auth = new AuthPage(page);
            const {firstName,lastName,photoUrl} = getRandomUser();

            await test.step('Continuar registro con email', async () => {
                const popup = await auth.openSamlPopup();
                const popupSignin = new AuthPage(popup);
                await test.step('Validar que todos los elementos del PopUp esten visibles', async () => {
                    await expect(popupSignin.signInWithSamlText,'El popup, no es visible').toBeVisible();
                    await expect(popupSignin.addNewAccountButton,'El botón "Añadir cuenta", no es visible').toBeVisible();
                });

                await test.step('Añadir una nueva cuenta', async () => {
                    await popupSignin.clickAddNewAccount();
                })
                
                await test.step('Llenar formulario con los datos opcionales, pero sin email', async () => {                    
                    await popupSignin.fillDisplayName(firstName);
                    await popupSignin.fillScreenName(lastName);
                    await popupSignin.fillProfilePhotoUrl(photoUrl);
                })

                await test.step('Validar deshabiltación del botón [SignInWithSamRas]', async () => {
                    await expect(popupSignin.singInwithSamRasButton).toBeDisabled();
                })  
                
                await test.step('Validar mensaje de error por email', async () => {
                    await popupSignin.getMessageText('Email required');
                    
                })                        
                
            })               
            
        })
        
        test('No debería permitir registrar un usuario sin el @ en el email', async ({ page }) => {
            const auth = new AuthPage(page);
            
            await test.step('Continuar registro con email', async () => {
                const popup = await auth.openSamlPopup();
                const popupSignin = new AuthPage(popup);
                await test.step('Validar que todos los elementos del PopUp esten visibles', async () => {
                    await expect(popupSignin.signInWithSamlText,'El popup, no es visible').toBeVisible();
                    await expect(popupSignin.addNewAccountButton,'El botón "Añadir cuenta", no es visible').toBeVisible();
                });

                await test.step('Añadir una nueva cuenta', async () => {
                    await popupSignin.clickAddNewAccount();
                })
                
                await test.step('Llenar formulario solo con email', async () => {                    
                    await popupSignin.fillEmail('email.com');
                })

                await test.step('Validar mensaje de error, por falta del @ en el email', async () => {
                    await popupSignin.getMessageText('Missing "@"');
                })    

                await test.step('Validar deshabiltación del botón [SignInWithSamRas]', async () => {
                    await expect(popupSignin.singInwithSamRasButton,'El botón "singInwithSamRas", se encuentra hábilitado').toBeDisabled();
                })              
                
            })               
            
        })
        
    })
    
        test.afterEach(async ({page,context }) => {
            await context.close();
            await page.close();
         }); 
    
})();