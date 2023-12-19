/// <reference types = 'Cypress' />
/// <reference types = 'cypress-iframe' />

import HomePage from "../PageObjects/HomePage"
import ProductPage from "../PageObjects/ProductPage"

describe('framework handling test', function()
{
    before(function(){

        // runs once before all tests in the block
        cy.fixture('example').then(function(data)
        {
            this.data = data
        })
    })
    it('should handle data inside framework', function() {
        const homePage = new HomePage()
        const productPage = new ProductPage()

        cy.visit('https://rahulshettyacademy.com/angularpractice/')

        homePage.getEditBox().type(this.data.name)
        homePage.getEmailid().type(this.data.email)
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBinding().should('have.value',this.data.name)
        homePage.getEditBox().should('have.attr','minlength','2')
        homePage.getEntrepreneurButton().should('be.disabled')
        homePage.getShopTab().click()

        this.data.productName.forEach(function(element) {

            cy.selectProduct(element)
        });

        productPage.getCheckOutPage().click()
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
})