Feature: Saucedemo Login

  @smoke @regression
  Scenario: Successful login
    Given I am on the Saucedemo login page
    When I enter the username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be redirected to the inventory page

  @smoke
  Scenario: Failed login
    Given I am on the Saucedemo login page
    When I enter the username "locked_out_user" and password "secret_sauce"
    And I click the login button
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."
