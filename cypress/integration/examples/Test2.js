describe('My second test suite', function()
{
    it('My second test case', function() {

        // selenium uses get to hit url in browser .
        // in Cypress get acts like findelement of selenium

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('.products').as('productlocator')
        cy.get('@productlocator').find('.product').each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text()
        if(textVeg.includes('Cashews'))
        {
            cy.wrap($el).find('button').click()
        }
        })
        cy.get('.cart-icon > img').click()
        cy.wait(2000)
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
        
    })
})