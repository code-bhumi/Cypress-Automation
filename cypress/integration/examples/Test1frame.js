describe ('My first test suite', function() 
{
    it('My first test case', function() {

        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
        cy.intercept({
            method : 'GET',
            url    : 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'

        }, 
        {
            StatusCode : 200,
            body : [{
                "book_name":"Learn Appium Automation with .net",
                "isbn":"hello",
                "aisle":"9090" }]
        }).as('bookretrievals')
        cy.get("button[class='btn btn-primary']").click()
        cy.wait('@bookretrievals').should(({request,response}) =>
        {
            cy.get('tr').should('have.length',response.body.length+1)
        })
        cy.get('p').should('have.text','Sorry we have only one book available')
    })

})