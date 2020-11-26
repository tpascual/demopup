const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({ 
        //headless: true 
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--headless', '--disable-gpu']
    });
    const page = await browser.newPage();

    await page.goto('https://administracion.gob.es/pagFront/empleoBecas/empleo/buscadorEmpleoAvanzado.htm');
    await page.type('#from', '24/11/2020');
    await page.type('#to', '24/11/2020');

//    await page.screenshot({path:'060.jpg', fullPage: true});
//    await page.waitForSelector('.ppg-icon__crossR-3a');
//    await page.click('.ppg-icon__crossR-3a');
    

    await page.click('.ppg-form__submitbox button');
    await page.waitForSelector('button[name="exportarExcel"]');
    await page.select('#numRegistrosMostrar', '100');
    
//     await page.waitForSelector('.resultadosBuscador');
// //    await page.screenshot({path:'060_2.jpg', fullPage: true});
    
    await page.waitForSelector('button[name="exportarExcel"]');
    //const elements = document.$$('h3');
    const elements = await page.$$('h3');
    //elements = elements.classList.remove('span');
    for (let elemento of elements){
        const dato = await page.evaluate(el => el.childNodes[2].data, elemento)
        //const dato = elemento.childNodes[2].data;
        console.log(dato);
        const browser2 = await puppeteer.launch({ 
            //headless: true 
            executablePath: '/usr/bin/chromium-browser',
            args: ['--no-sandbox', '--headless', '--disable-gpu']
        });
        const page2 = await browser2.newPage();
        await page2.goto('https://administracion.gob.es/pagFront/empleoBecas/empleo/buscadorEmpleo.htm?idRegistro='+dato);
        await page2.waitForSelector('h1');
        const datosFichas = await page2.$$("fieldset");
        let contador=0;
        for (let datosFicha of datosFichas){
            console.log(await page2.evaluate(el2 => el2.querySelector("legend").innerText, datosFicha));
            if(contador==1){
                console.log(await page2.evaluate(el2 => el2.querySelector("div").innerText, datosFicha));
            } else {
                console.log(await page2.evaluate(el2 => el2.querySelector("span").innerText, datosFicha));
            }
            
            // console.log(datosficha.queryselector("legend").innerText);
            // console.log(datosficha.queryselector("span").innerText)
            contador++;
        }
        //await page2.waitForTimeout(10000);
        await browser2.close();
        //document.getElementsByName("detalleRegistro").click();
        //element.push('input[type="submit"]');
        //await page.waitForSelector('h1');
        
    }

    //  const selectores = await page.evaluate(()=>{
    //     const elements = document.$('h3');
        
    //     for (let element of elements){
    //         console.log(element.innerText);
    //     }
        
    //      //return elements;
    //  });
    //console.log(selectores.length);
    await browser.close();
})();
