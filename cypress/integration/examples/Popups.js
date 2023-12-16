describe('Window alert test suite', function()
{
    it('alert and pop up test case', function() {

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get('#alertbtn').click()
        cy.get('[value="Confirm"]').click()
        // cypress auto accept all the alerts and popups
        // window alert is the event which get fired on alert open
        cy.on('window:alert',(str)=>
        {
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })

        cy.on('window:confirm',(str)=>
        {
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })
    })
})