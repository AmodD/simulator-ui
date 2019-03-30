Feature: Numeric RIGHT Justified

  @ORPHAN
  Scenario: Random sequence within PAN to be RIGHT justified
    Given System has to generate a number randomly
    When the random number generated is single digit
    Then system should store/display the number RIGHT justified with leading zeros
