describe ('My first test suite', function() 
{
    it('My first test case', function() {

        cy.request('POST', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', {

            "name" : "Learn Appium Automation with Java",
            "isbn" : "bcdsqs",
            "aisle" : "22s7",
            "author" : "John Foe"
            }).then(function(response)
        {
            expect(response.body).to.have.property("Msg","successfully added")
            expect(response.status).to.eq(200)
            
        })

    })
})   
