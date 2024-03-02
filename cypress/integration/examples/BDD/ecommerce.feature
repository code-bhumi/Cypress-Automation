Feature: End to End Ecommerce Validation

    application Regression

    Scenario: Ecommerce Products delivery
        Given I open Ecommerce Page
        When I Add products to cart
        When Validate the total price
        Then select the country submit and verify Thankyou

    Scenario: Filling the form to shop
        Given I open Ecommerce Page
        When I fill the form details
            |name | gender |
            |Ram  | Male   |
        When Validate the form behavior
        Then select the shop page


        