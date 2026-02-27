import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { HomePage } from '../pages/homePage';
import { CalendarPage } from '../pages/calendarPage';
import { getDateForDay } from '../utils/generators';

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

    test.describe('Calendar', () => {

        test.describe('Year View', () => {

            test('Debería permitir descargar el calendario anual', async ({ page }) => {
                test.info().annotations.push({ type: 'Objetivo', description: 'Validar la descarga del calendario anual del release train' });
                const calendar = new CalendarPage(page);
                const home = new HomePage(page);
        
                await test.step('Click en "Calendar"', async () => {
                    await home.clickCalendarButton();
                })
    
                await test.step('Validar que sean visibles las 2 opciones: Calendar y Year View', async () => {
                    await expect (calendar.calendarYearViewMenuItem,'El sub-menú "Year View", no es visible').toBeVisible();
                    await expect (calendar.calendarMenuItem,'El sub-menú "Calendar", no es visible').toBeVisible();
                })
                
                await test.step('Click a la opción "Year view"', async () => {
                    await calendar.clickCalendarYearViewMenuItem();
                    
                })

                await test.step('Validar elementos de "Year View"', async () => {
                    await expect (calendar.yearViewLabel,'El elemento "Year View", no es visible').toBeVisible();
                    await expect (calendar.downloadButton,'El botón descargar, no está hábilitado').toBeEnabled();
                    await expect (calendar.downloadButton,'El botón descargar, no contiene el nombre "Dowload"').toHaveText('Download');
                })

                await test.step('Descargar calendario', async () => {
                    const download = await calendar.triggerDownload();
                    await expect (download, 'No se descargó ningún archivo').not.toBeNull();
                })
                
            })
                    
        })

        test.describe('Calendar', () => {

            test('Debería permitir crear un evento con fecha y hora especifica', async ({ page }) => {
                test.info().annotations.push({ type: 'Objetivo', description: 'Validar que se permita crear un evento y este asociado a un release y se muestre en el calendario' });
                const calendar = new CalendarPage(page);
                const home = new HomePage(page);
                await test.step('Click en "Calendar"', async () => {
                    await home.clickCalendarButton();
                })
    
                await test.step('Click a la opción "Calendar"', async () => {
                    await calendar.clickCalendarMenuItem();               
                })

                await test.step('Click a un día del calendario', async () => {
                    await calendar.clickMondayCalendarButton();                  
                })

                await test.step('Crear Evento', async () => {

                    await test.step('Selecionar Release', async () => {
                        await calendar.selectReleaseEventByLabel('July 2nd'); 
                    })

                    await test.step('Agregar nombre del evento', async () => {
                        await calendar.fillAddNameEventsTextbox('E2E Eliminar');   
                    })

                    await test.step('Seleccionar categoría del evento', async () => {
                        await calendar.selectCategoryByLabel('End to End Test');    
                    })

                    await test.step('Elegir fecha de evento', async () => {
                        const jueves = getDateForDay(4);
                        await calendar.setStartDate(jueves);
                    })

                    await test.step('Elegir Hora de Inicio', async () => {
                        await calendar.selectStartTimeByLabel('10:00')
                        
                    })
                    await test.step('Elegir Hora de Fin', async () => {
                        await calendar.selectEndTimeByLabel('11:00');   
                    })

                    await test.step('Agregar nota al evento', async () => {
                        await calendar.fillNotasEventsTextBox('Este evento indica la recepción de paquetes');
                    })

                    await test.step('Crear Evento', async () => {
                        await calendar.clickCreateEventsButton();                      
                    })
                    
                    await test.step('Validar Mensaje de evento creado', async () => {
                        await expect (calendar.getMessageText('Create event success'),'El mensaje de que el evento se creo, no es visible').toBeVisible();
                        await expect (calendar.getMessageText('Create event success'),'El mensaje no contiene el texto "Create event success"').toHaveText('Create event success');                     
                    })
                    
                    await test.step('Validar creación del evento', async () => {
                        await expect(calendar.getSelectEventButtonByText('E2E Eliminar'),'El evento "E2E Eliminar", no es visible').toBeVisible();   
                    })            
                    
                })                    
            
            })

            test('Debería permitir crear un evento con horario de todo el día con una fecha especifica', async ({ page }) => {
                test.info().annotations.push({ type: 'Objetivo', description: 'Validar que se permita crear un evento con horario de todo el día y este asociado a un release y se muestre en el calendario' });
                const calendar = new CalendarPage(page);
                const home = new HomePage(page);
                await test.step('Click en "Calendar"', async () => {
                    await home.clickCalendarButton();
                })
    
                await test.step('Click a la opción "Calendar"', async () => {
                    await calendar.clickCalendarMenuItem();               
                })

                await test.step('Click a un día del calendario', async () => {
                    await calendar.clickMondayCalendarButton();                  
                })

                await test.step('Crear Evento', async () => {
                    
                    await test.step('Selecionar Release', async () => {
                        await calendar.selectReleaseEventByLabel('July 2nd'); 
                    })

                    await test.step('Agregar nombre del evento', async () => {
                        await calendar.fillAddNameEventsTextbox('E2E AllDay');   
                    })

                    await test.step('Seleccionar categoría del evento', async () => {
                        await calendar.selectCategoryByLabel('End to End Test');    
                    })

                    await test.step('Elegir fecha de evento', async () => {
                        const miercoles = getDateForDay(3);
                        await calendar.setStartDate(miercoles);
                    })

                    await test.step('Marcar Full day Event', async () => {
                        await calendar.toggleFullDayEvents();           
                    })
                   
                    await test.step('Agregar nota al evento', async () => {
                        await calendar.fillNotasEventsTextBox('Este evento indica la recepción de paquetes');
                    })

                    await test.step('Crear Evento', async () => {
                        await calendar.clickCreateEventsButton();                      
                    })
                    
                    await test.step('Validar Mensaje de evento creado', async () => {
                        await expect (calendar.getMessageText('Create event success'),'El mensaje de que el evento se creo, no es visible').toBeVisible();
                        await expect (calendar.getMessageText('Create event success'),'El mensaje no contiene el texto "Create event success"').toHaveText('Create event success');
                        
                    })
                    
                    await test.step('Validar creación del evento', async () => {
                        await expect(calendar.getSelectEventButtonByText('E2E AllDay'),'El evento "E2E", no es visible').toBeVisible();   
                    })            
                    
                })
                
            })
            
            test('Debería permitir crear un evento con multiples días y horarios ', async ({ page }) => {
                test.info().annotations.push({ type: 'Objetivo', description: 'Validar que se permita crear un evento con horario de todo el día y este asociado a un release y se muestre en el calendario' });
                const calendar = new CalendarPage(page);
                const home = new HomePage(page);
                await test.step('Click en "Calendar"', async () => {
                    await home.clickCalendarButton();
                })
    
                await test.step('Click a la opción "Calendar"', async () => {
                    await calendar.clickCalendarMenuItem();               
                })

                await test.step('Click a un día del calendario', async () => {
                    await calendar.clickMondayCalendarButton();                  
                })

                await test.step('Crear Evento', async () => {
                    
                    await test.step('Selecionar Release', async () => {
                        await calendar.selectReleaseEventByLabel('July 2nd'); 
                    })

                    await test.step('Agregar nombre del evento', async () => {
                        await calendar.fillAddNameEventsTextbox('SIT MultiDay');   
                    })

                    await test.step('Seleccionar categoría del evento', async () => {
                        await calendar.selectCategoryByLabel('End to End Test');    
                    })

                    await test.step('Marcar Multiples días de evento', async () => {
                        await calendar.toggleMultipleDayEvent();
                    })
                    
                    await test.step('Elegir fecha y hora inicio del evento', async () => {
                        const lunes = getDateForDay(1);
                        await calendar.setStartDate(lunes);
                        await calendar.selectStartTimeByLabel('10:00');
                    })

                    await test.step('Elegir fecha y hora fin del evento', async () => {
                        const viernes = getDateForDay(5,1);
                        await calendar.setEndDate(viernes);
                        await calendar.selectEndTimeByLabel('14:00');
                    })
             
                    await test.step('Agregar nota al evento', async () => {
                        await calendar.fillNotasEventsTextBox('Este evento indica la fase de pruebas de estabilización de ambiente');
                    })

                    await test.step('Crear Evento', async () => {
                        await calendar.clickCreateEventsButton();                      
                    })
                    
                    await test.step('Validar Mensaje de evento creado', async () => {
                        await expect (calendar.getMessageText('Create event success'),'El mensaje de que el evento se creo, no es visible').toBeVisible();
                        await expect (calendar.getMessageText('Create event success'),'El mensaje no contiene el texto "Create event success"').toHaveText('Create event success');
                        
                    })
                    
                    await test.step('Validar creación del evento', async () => {
                        await expect(calendar.getSelectEventButtonByText('SIT MultiDay'),'El evento "SIT", no es visible').toBeVisible();   
                    })            
                    
                })
                
            })
       
            test('Debería permitir eliminar un evento del calendario', async ({ page }) => {
                test.info().annotations.push({ type: 'Objetivo', description: 'Validar que se permita eliminar un evento del calendario' });
                const calendar = new CalendarPage(page);
                const home = new HomePage(page);
                await test.step('Click en "Calendar"', async () => {
                    await home.clickCalendarButton();
                })
        
                await test.step('Click a la opción "Calendar"', async () => {
                    await calendar.clickCalendarMenuItem();              
                })
                    
                await test.step('Clic al evento a eliminar', async () => {
                    await calendar.clickSelectEventButtonByText('SIT MultiDay');   
                })

                await test.step('Editar Evento', async () => {
                    await calendar.clickEditarEventButton();                      
                })

                await test.step('Eliminar Evento', async () => {
                    await calendar.clickDeleteEventsButton();                       
                })

                await test.step('Validar visibilidad del elemento cancelar', async () => {
                    await expect(calendar.cancelDeleteEvent,'El elemento cancelar, no es visible').toBeVisible;                       
                })
                    
                    
                await test.step('Eliminar Evento', async () => {
                    await calendar.clickDeleteEventsButton();                      
                })
                    
                await test.step('Validar elmiminación de evento', async () => {
                    await expect (calendar.getMessageText('Delete event success'),'El elemento no tiene el texto "Delete event success"').toHaveText('Delete event success');
                    await expect (calendar.selectEventButton).not.toBeVisible;
                })
                
            })

            test('Debería permitir actualizar un evento del calendario', async ({ page }) => {
                test.info().annotations.push({ type: 'Objetivo', description: 'Validar que se permita actualizar un evento del calendario' });
                const calendar = new CalendarPage(page);
                const home = new HomePage(page);
                await test.step('Click en "Calendar"', async () => {
                    await home.clickCalendarButton();
                })
        
                await test.step('Click a la opción "Calendar"', async () => {
                    await calendar.clickCalendarMenuItem();                  
                })

                await test.step('Click al evento a actualizar', async () => {
                    await calendar.clickSelectEventButtonByText('E2E Eliminar');                       
                })

                await test.step('Click al botón editar', async () => {
                    await calendar.clickEditarEventButton();                      
                })
                    
                await test.step('Elegir nueva fecha de evento', async () => {
                        const viernes = getDateForDay(5);
                        await calendar.setStartDate(viernes);
                })  
                    
                await test.step('Click al botón Update', async () => {
                    await calendar.clickUpdateEventsButton();                        
                })
                    
                await test.step('Validar mensaje de actualización de evento', async () => {
                    await expect(calendar.getMessageText('Update event success'),'El mensaje, no es visible').toBeVisible();                       
                })                                
                    
            })
                
            test('Debería permitir descargar el calendario mensual', async ({ page }) => {
                test.info().annotations.push({ type: 'Objetivo', description: 'Validar que se permita descargar el calendario mensual' });
                const calendar = new CalendarPage(page);
                const home = new HomePage(page);
                await test.step('Click en "Calendar"', async () => {
                    await home.clickCalendarButton();
                })
        
                await test.step('Click a la opción "Calendar"', async () => {
                    await calendar.clickCalendarMenuItem();    
                })

                await test.step('Descargar calendario', async () => {
                    const download = await calendar.triggerDownload();
                    await expect (download, 'No se descargó ningún archivo').not.toBeNull();
                })

            })           
                                           
        })
 
    })
         
    test.afterEach(async ({page,context }) => {
        await context.close();
        await page.close();
    }); 
    
})();