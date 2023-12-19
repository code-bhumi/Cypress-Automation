describe('Mouse Hover handling test', function()
{
    it('should handle mouse hover', function() {

        cy.visit(Cypress.env('url')+"/AutomationPractice/");
        
        cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('include','top')


    })
})