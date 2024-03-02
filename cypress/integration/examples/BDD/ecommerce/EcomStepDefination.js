import HomePage from '../../../../support/PageObjects/HomePage'
import ProductPage from '../../../../support/PageObjects/ProductPage'
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const homePage = new HomePage()
const productPage = new ProductPage()
let name

Given('I open Ecommerce Page', function()
{
    cy.visit(Cypress.env('url')+'/angularpractice/')
})

When('I Add products to cart', function() 
{
    homePage.getShopTab().click()
    this.data.productName.forEach(function(element) {
    cy.selectProduct(element)
});
        
    productPage.getCheckOutPage().click()
})

When('Validate the total price', function()
{
var sum = 0
    cy.get('tr td:nth-child(4) strong').each(($e1, index, $list) => {

    const amount = $e1.text()
    var result = amount.split(" ")
    result = result[1].trim()
    sum = Number(sum)+Number(result)
    cy.log(result)
}).then(function() 
{   
    cy.log(sum)
})
cy.get('h3 strong').then(function(element)
{
    const amount = element.text()
    var result = amount.split(" ")
    var total = result[1].trim()
    expect(Number(total)).to.equal(sum)
})

})

Then('select the country submit and verify Thankyou', function() 
{
    productPage.getCheckOutButton().click()
    productPage.getCountryName().type(this.data.countryName)
    cy.wait(2000)
    productPage.getSelectedCountry().click()
    productPage.getCheckboxButton().click()
    productPage.gotoPurchase().click()
    productPage.getSuccessMsg().should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
    productPage.getSuccessMsg().then(function(element)
{
    const actualText = element.text()
    expect(actualText.includes("Success")).to.be.true
})
}) 

When('I fill the form details',function(dataTable)
{
    name = dataTable.rawTable[1][0]
    homePage.getEditBox().type(dataTable.rawTable[1][0])
    homePage.getGender().select(dataTable.rawTable[1][1])
    
})

When('Validate the form behavior', function()
{
    homePage.getTwoWayDataBinding().should('have.value',name)
    homePage.getEditBox().should('have.attr','minlength','2')
    homePage.getEntrepreneurButton().should('be.disabled')
    Cypress.config('defaultCommandTimeout', 8000)
})

Then('select the shop page', function()
{
    homePage.getShopTab().click()
})  



