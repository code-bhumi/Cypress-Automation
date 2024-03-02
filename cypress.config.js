import { defineConfig }  from 'cypress'
import browserify from "@cypress/browserify-preprocessor"
import preprocessor from "@badeball/cypress-cucumber-preprocessor"
import excelToJson from 'convert-excel-to-json';
import fs from 'fs';
const ExcelJs = require('exceljs');

// const excelToJson = require('convert-excel-to-json');
// const fs = require('fs');

async function setupNodeEvents(on, config) {  
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  //on("file:preprocessor", browserify.default=config);

  //task = sqlServer.loadDBPlugin(config.db);
  //on('task', tasks);

  on('task', {

      excelToJsonConvertor(filePath)
      {
        const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
        });
        return result;
      }
  });

  on('task', {

    async writeExcelTest({searchText,replaceText,change,filepath})
    {
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filepath)
        const worksheet = workbook.getWorksheet("FirstData");
        
        const output = await readExcel(worksheet,searchText);
    
        cell = worksheet.getCell(output.row,output.coloumn+change.colChange)
        cell.value = replaceText;
        console.log("Writing at row = " + cell.row + " and col = " + cell.col);
        await workbook.xlsx.writeFile(filepath);
        console.log("cell updated succcessfully !!!");
    }

  })
  return config;
}

async function readExcel(worksheet,searchText)
{
    let output = {row:-1, coloumn :-1}
    worksheet.eachRow((row,rowNumber) =>
    {
        row.eachCell((cell,colNumber) =>
        {
            if (cell.value === searchText)
            {
                output.row = cell.row; 
                output.coloumn = cell.col;
            }
        })
    })
    return output;

}

export default defineConfig({
  defaultCommandTimeout: 6000, 
  reporter: 'mochawesome',
  env: {
    url : "https://rahulshettyacademy.com"
  },
  retries: {
    runMode: 1,
  },
  projectId: "ibg351",
  
  e2e: {
    setupNodeEvents,
    specPattern:'cypress/integration/examples/BDD/*.feature'
  },
});
