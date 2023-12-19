describe('Check box and radio button handling test', function()
{
    it('should handle radio button and check boxes', function() {

        cy.visit(Cypress.env('url')+"/AutomationPractice/");
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get("input[type='checkbox']").check(['option2','option3'])
        
        // static dropdown selection method
        cy.get('select').select('option2').should('have.value','option2')
        
        // Dynamic dropdown selection method
        cy.get('#autocomplete').type('ind')

        cy.get('.ui-menu-item div').each(($e1, index, $list) => {

            if($e1.text()=='India')
            {
                $e1.click()
            }
        })

        // autocomplete
        cy.get('#autocomplete').should('have.value','India')
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        // select radio button selection
        
        cy.get('[value="radio2"]').check().should('be.checked')
        

    })
})