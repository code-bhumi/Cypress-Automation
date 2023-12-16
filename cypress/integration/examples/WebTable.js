describe('Handling web table', function()
{
    it('should find the particular coloumn and get sibling coloumn value', function() {

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        cy.get('.table-display tr td:nth-child(2)').each(($e1, index, $list) => {

        const text = $e1.text()
        if(text.includes("Python"))
        {
            cy.get('.table-display tr td:nth-child(2)').eq(index).next().then(function(price)
            {
                const priceText = price.text()
                expect(priceText).to.equal('25')
            })
        }   

        })
    })
})