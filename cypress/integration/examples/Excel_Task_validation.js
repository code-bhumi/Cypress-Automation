/// <reference types = "cypress" />

const neatCSV = require('neat-csv')
let productName
describe('JWT Session', () => {
    it('is logged in through local storage', () => {

        cy.LoginAPI().then(function()
        {
            cy.visit("https://rahulshettyacademy.com/client",
            {
                onBeforeLoad : function(window)
                {
                    window.localStorage.setItem('token',Cypress.env('token'))
                }
            })
        })

        cy.get(".card-body b").eq(1).then(function(ele)
        {
            productName = ele.text();
        })
        cy.get(".card-body button:last-of-type").eq(1).click();
        cy.get("[routerlink*='cart']").click;
        cy.contains("Checkout").click();
        cy.get("[placeholder*='Country']").type("ind")
        cy.get(".ta-results button").each(($el,index,$list)=>
        {
            if($el.text() == " India")
            {
                cy.wrap($el).click()
            }
        })
        cy.get(".action_submit").click();
        cy.wait(2000)
        cy.get(".order-summary button").contains("Excel").click();
 
        const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoive_Siya.xlsx"
        cy.task('excelToJsonConvertor',filePath).then(function(result)
        {
            cy.log(result.data[1].A);
            expect(productName).to.equal(result.data[1].B);
        })

        cy.readFile(filePath).then(function(text)
        {
            expect(text).to.include(productName);
        })

        // Browser(Engine) = JS code -> Client side envioronmaent (front end) - Cypress

        //Node (Engine) = Js code -> Back end applications/enviornment

        // Accessing files - fs, databaseaccess,

        // Task -(Files,DB) -> Config.js, (ExcelToJason) -> cy.Task(ExcelToJason)
       
        
    })
})