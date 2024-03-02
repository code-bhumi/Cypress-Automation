class ProductPage

{
getCheckOutPage()
{
    return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link')
} 

getCheckOutButton()
{
    return cy.get(':nth-child(4) > :nth-child(5) > .btn')
}

getCountryName()
{
    return cy.get('#country')
}

getSelectedCountry()
{
    return cy.get('.suggestions > :nth-child(1) > li > a')
}

getCheckboxButton()
{
    return cy.get('.checkbox > label')
}

gotoPurchase()
{
    return cy.get('input[type="submit"]')
}

getSuccessMsg()
{
    return cy.get('.alert')
}
}


export default ProductPage;