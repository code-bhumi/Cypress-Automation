import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

const homePage = new HomePage()
const productPage = new ProductPage()

Given('I open Ecommerce Page', ()=> 
{
    cy.visit(Cypress.env('url')+'/angularpractice/')
})

When('I Add products to cart', ()=> 
{
    homePage.getShopTab().click()
    this.data.productName.forEach(function(element) {
    cy.selectProduct(element)
});
        
    productPage.getCheckOutPage().click()
})


And('Validate the total price', ()=>
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

Then('select the country submit and verify Thankyou', ()=> 
{
    productPage.getCheckOutButton().click()
    productPage.getCountryName().type(this.data.countryName)
    cy.wait(2000)
    productPage.getSelectedCountry().click()
    productPage.getCheckboxButton().click()
    productPage.gotoPurchase().click()
    //productPage.getSuccessMsg().should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
    productPage.getSuccessMsg().then(function(element)
{
    const actualText = element.text()
    expect(actualText.includes("Success")).to.be.true
})
})

When('I fill the form details', ()=>
{
    homePage.getEditBox().type(this.data.name)
    homePage.getEmailid().type(this.data.email)
    homePage.getGender().select(this.data.gender)
})

Then('Validate the form behavior', ()=>
{
    homePage.getTwoWayDataBinding().should('have.value',this.data.name)
    homePage.getEditBox().should('have.attr','minlength','2')
    homePage.getEntrepreneurButton().should('be.disabled')
    Cypress.config('defaultCommandTimeout', 8000)
})

Then('select the shop page', ()=>
{
    homePage.getShopTab().click()
})


// "@cypress/browserify-preprocessor": "latest"