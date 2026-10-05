Feature: Admin user management
  As an administrator
  I want to filter system users by role
  So that I can find accounts quickly

  Scenario: Admin filters system users by role
    Given I am logged in as an admin
    And I am on the user management page
    When I search users with the role "ESS"
    Then the role filter should show "ESS"
    And the first result should have the role "ESS"