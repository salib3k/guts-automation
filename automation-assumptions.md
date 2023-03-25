# Automation Assumptions, Guts Casino

### Valid Search

'Book of' was used as a search since it's a common theme used in slot games.

### Invalid Search

The choice of characters was chosen as it was highly unlikely for any game to feature that name.
A longer, random, string of characters may be used to more effectively ensure an invalid search

### Click with 'force true' in search

On different sized screens, it seemed like the option for 'fun' play was not always visible.

To mitigate this, a force click was implemented, as well as ensuring that the viewport dimensions were preset to 1920x1080p

### Test structure for forms

Every step of the form was selected as an individual test in order to better understand where any errors might have originated from, should the process fail.

### Flow for negative path tests

The possible scenarios for errors were first explored manually. This was done to identify scenarios like 'empty', 'invalid' etc.

Following this, the flow was structured in such a way to explore, separately, all possible scenarios for each step.

Test isolation was set to false to purposely allow for the test to flow from one instance to the next without needing to reload everything from scratch, thus making the code more efficient.

Once the negative test is complete and the correct assertions are made, the happy path is introduced to move onto the next step.

