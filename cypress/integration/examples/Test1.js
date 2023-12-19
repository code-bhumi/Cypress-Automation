describe('My first test suite', function()
{
    it('My first test case', function() {

        // selenium uses get to hit url in browser .
        // in Cypress get acts like findelement of selenium

        cy.visit(Cypress.env('url')+"/seleniumPractise/#/");
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('.product:visible').should('have.length',4)
        // parent child chaining
        cy.get('.products').as('productlocator')
        cy.get('@productlocator').find('.product').should('have.length',4)
        cy.get(':nth-child(3)>.product-action > button').click()
        cy.get('@productlocator').find('.product').eq(2).contains('ADD TO CART').click().then(function()
        {
            console.log('sf')
        })
        
        cy.get('@productlocator').find('.product').each(($el, index, $list) => {
            
        const textVeg = $el.find('h4.product-name').text()
        if(textVeg.includes('Cashews'))
        {
            cy.wrap($el).find('button').click()
        }
        })

        // this is to assert if logo text is correctly displayed or not
        cy.get('.brand').should('have.text','GREENKART')
        // this is to print in something in logs
        cy.get('.brand').then(function(logoelement) 
        {
            cy.log(logoelement.text())

        })

        
    })
})