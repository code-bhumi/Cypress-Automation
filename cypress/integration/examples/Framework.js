/// <reference types = 'Cypress' />
/// <reference types = 'cypress-iframe' />

import HomePage from "../PageObjects/HomePage"
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

    })
})