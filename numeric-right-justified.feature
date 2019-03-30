Feature: Numeric RIGHT Justified

  @TG-7 @TG-5 @OPEN
  Scenario: Random sequence within PAN to be RIGHT justified
    Given System has to generate a 9 digit sequence number randomly
    AND The length of the number is known
    When the random number generated is single digit
    Then system should store/display the number RIGHT justified with leading zeros
