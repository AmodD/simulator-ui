Feature: RuPay Card Validation

  @TG-23 @OPEN
  Scenario: To Validate the length of RuPay Card
    Given Select Network type
    When value is "rupay"
    And starting digit of the Card is "6"
    Then Length of the card is "16"
