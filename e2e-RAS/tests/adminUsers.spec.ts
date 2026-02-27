import { test ,expect} from '@playwright/test';
import { AuthPage } from "../pages/authPage";
import { UsersPage } from '../pages/adminUsersPage';
import { HomePage } from '../pages/homePage';

(async ()=>{

    test.beforeEach(async ({ page }) => {
        const auth = new AuthPage(page);
        await auth.goto();
        await auth.signIn('it@ras.com');
        
    })

    test.describe('CRUD Usuarios', () => {
        
        test('Debería permitir editar un usuario', async ({ page }) => {
            test.info().annotations.push({ type: 'Objetivo', description: 'Validar que el sistema permita editar el nombre completo del usuario, asegurando que cada elemento del flujo de edición funcione correctamente' });

            const users = new UsersPage(page);
            const home = new HomePage(page);

            await test.step('Ir a la opción de "Admin Users"', async () => {
                await home.clickAvatarButton();
                await home.goToAdminUsers();
            })
            
            await test.step('Seleccionar usuario a editar', async () => {
                await users.clickEditUserByEmail('eduardo.sanmartin@spin.co');   
            })

            await test.step('Cerrar modal de edición de usuario', async () => {
                await users.closeEditUserModal();    
            })

            await test.step('Seleccionar usuario a editar', async () => {
                await users.clickEditUserByEmail('eduardo.sanmartin@spin.co');    
            })
            
            await test.step('Modificar el full name del usuario', async () => {
                await users.fillFullName('Black Panther');
            })
            
            await test.step('Guardar los cambios realizados', async () => {
                await users.saveUser();      
            })

            await test.step('Validar mensaje de exito', async () => {
                await expect (users.getMessageText('Update user success'),'El mensaje de exito"Update user success",no se está mostrando').toBeVisible();
            })

            await test.step('Validar el cambio del full name en la tabla', async () => {
                await expect (users.getFullNameText('eduardo.sanmartin@spin.co','Black Panther')).toBeVisible();
            })
                                  
        })

        test('Debería permitir editar un usuario soló con letras y espacios', async ({ page }) => {
            test.info().annotations.push({ type: 'Objetivo', description: 'Validar que el sistema NO permita editar el nombre completo del usuario, si se ingresan datos diferentes a espacios y letras' });

            const users = new UsersPage(page);
            const home = new HomePage(page);

            await test.step('Ir a la opción de "Admin Users"', async () => {
                await home.clickAvatarButton();
                await home.goToAdminUsers();
            })
            
            await test.step('Editar usuario', async () => {
                await users.clickEditUserByEmail('eduardo.sanmartin@spin.co');
                
            })
            
            await test.step('Modificar full name con caracteres especiales', async () => {
                await users.fillFullName('Black Panther.');
            })

            await test.step('Validar mensaje de error y botón [Save] deshábilitado', async () => {
                await expect (users.getMessageText('Only letters, spaces, and accents are allowed'),'No se está mostrando el mensaje de error"Only letters, spaces, and accents are allowed"').toBeVisible();
                await expect (users.saveUserButton,'El botón [Save], no está deshábilitado').toBeDisabled();
            })

            await test.step('Modificar full name con carácteres especiales', async () => {
                await users.fillFullName('Black Panthérñ$');
            })

            await test.step('Validar mensaje de error y botón [Save] deshábilitado', async () => {
                await expect (users.getMessageText('Only letters, spaces, and accents are allowed'),'No se está mostrando el mensaje de error"Only letters, spaces, and accents are allowed"').toBeVisible();
                await expect (users.saveUserButton,'El botón [Save], no está deshábilitado').toBeDisabled();
            })

            await test.step('Modificar full name con carácteres especiales', async () => {
                await users.fillFullName('Black Panther&');
            })

            await test.step('Validar mensaje de error y botón [Save] deshábilitado', async () => {
                await expect (users.getMessageText('Only letters, spaces, and accents are allowed'),'No se está mostrando el mensaje de error"Only letters, spaces, and accents are allowed"').toBeVisible();
                await expect (users.saveUserButton,'El botón [Save], no está deshábilitado').toBeDisabled();
            })
            
        })

       test('Debería permitir eliminar un usuario', async ({ page }) => {
            test.info().annotations.push({ type: 'Objetivo', description: 'Validar que el sistema permita eliminar usuarios' });
            const users = new UsersPage(page);
            const home = new HomePage(page);

            await test.step('Ir a la opción de "Admin Users"', async () => {
                await home.clickAvatarButton();
                await home.goToAdminUsers();
            })

            await test.step('Eliminar usuario', async () => {
                await users.clickDeleteUserByEmail('EDHER.NORIEGA@DIGITALFEMSA.COM');                
            })

            await test.step('Validar que el usuario no exista en la tabla', async () => {
                await expect (users.getDeleteUserButton('EDHER.NORIEGA@DIGITALFEMSA.COM'),'El usuario no se elimino, sigue siendo visible el registro').not.toBeVisible();
            })    

       })      
        
    })

    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
        await page.close();
    })
    

})();

    


