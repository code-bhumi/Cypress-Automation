Feature: End to End Ecommerce Validation

Application Regression

Scenario: Ecommerce Product delivery
Given I open Ecommerce Page
When I Add products to cart
And Validate the total price
Then select the country submit and verify Thankyou

Scenario: Filling the form to shop
Given I open Ecommerce Page
When I fill the form details
Then Validate the form behavior
And select the shop page


