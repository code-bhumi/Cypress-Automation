class HomePage
{

getEditBox()
{
    return cy.get('input[name="name"]:nth-child(2)')
}

getTwoWayDataBinding()
{
    return cy.get(':nth-child(4) > .ng-untouched')
}

getEmailid()
{
    return cy.get('input[name="email"]')
}

getGender()
{
    return cy.get('select')
}

getEntrepreneurButton()
{
    return cy.get('#inlineRadio3')
}

getShopTab()
{
    return cy.get(':nth-child(2) > .nav-link')
}
}

export default HomePage;