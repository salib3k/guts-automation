/// <reference types="cypress" />

describe('guts search & navigation', () => {

    beforeEach(() => {

        cy.visit('https://www.guts.com')

    })

    it('play valid search', () => {

        cy.get('[data-testid="searchInput"]').type('Book of')
        cy.get('.game-fun-link').first().click({force: true})

    })

    it('search with no results', () => {

        cy.get('[data-testid="searchInput"]').type('?1!?2!?3!')
        cy.get('[data-testid="searchResultsNothingFound"]').should('be.visible')

    })

    it('select first promotion', () => {

        cy.get('[href="/en/promotions"]').click()
        cy.get('[data-testid="PromoTilesDisplay"]').first().contains('READ MORE').click()

    })

})

describe('sign up happy path', () => {

    it('Step 1', () => {

        cy.visit('https://www.guts.com')

        cy.get('[href="/en/signup"] > .button').click()
        cy.get('[data-testid="signup-stepone-email"]').type('qatest@gutsautomation.com')
        cy.get('[data-testid="mobile-input"]').type('98112305')
        cy.get('[data-testid="signup-stepone-submit"]').click()

    })

    it('Step 2', () => {

        cy.get('[data-testid="signup-steptwo-password"]').type('aabbcc112233!?')
        cy.get('[data-testid="signup-steptwo-submit"]').click()

    })

    it('Step 3', () => {

        cy.get('[data-testid="signup-stepthree-address"]').type('1, Fake Rd.')
        cy.get('[data-testid="signup-stepthree-postcode"]').type('ABC123')
        cy.get('[data-testid="signup-stepthree-city"]').type('City')
        cy.get('[data-testid="signup-stepthree-depositLimit"]').type('99')
        cy.get('[data-testid="signup-stepthree-submit"]').click()

    })

    it('Step 4', () => {

        cy.get('[data-testid="signup-stepfour-firstname"]').type('John')
        cy.get('[data-testid="signup-stepfour-surname"]').type('Doe')
        cy.get('[data-testid="signup-stepfour-gender-m"]').click()
        cy.get('[data-testid="signup-stepfour-dob"]').type('01011988')
        cy.get('[data-testid="signup-stepfour-submit"]').click()

    })

})

describe('Error validation', () => {

    it('Step 1: Empty Fields', () => {

        cy.visit('https://www.guts.com')

        cy.get('[href="/en/signup"] > .button').click()
        cy.get('[data-testid="signup-stepone-email"]').click()
        cy.get('[data-testid="mobile-input"]').click()
        cy.get('[data-testid="signup-stepone-submit"]').click({force:true})

        cy.get(':nth-child(1) > .help > [data-testid="input-error"]').contains('Please fill this in').should('be.visible')
        cy.get(':nth-child(2) > .help > [data-testid="input-error"]').contains('Please fill this in').should('be.visible')

    })

    it('Step 1: Invalid Fields', () => {

        cy.get('[data-testid="signup-stepone-email"]').type('notEmail')
        cy.get('[data-testid="mobile-input"]').type('notMobile')
        cy.get('[data-testid="signup-stepone-submit"]').click({force:true})

        cy.get(':nth-child(1) > .help > [data-testid="input-error"]').contains('Email is not Valid').should('be.visible')
        cy.get(':nth-child(2) > .help > [data-testid="input-error"]').contains('Mobile is not valid').should('be.visible')

    })

    it('Step 2: Empty Fields', () => {

        cy.get('[data-testid="signup-stepone-email"]').type('{selectall}{backspace}qatest@gutsautomation.com')
        cy.get('[data-testid="mobile-input"]').type('{selectall}{backspace}98112305')
        cy.get('[data-testid="signup-stepone-submit"]').click()

        cy.get('[data-testid="signup-steptwo-password"]').click()

        cy.get('.label').click() //arbitrary point to be clicked in order for error to display

        cy.get('[data-testid="input-error"]').contains('Please fill this in').should('be.visible')

    })

    it('Step 2: Invalid Fields', () => {

        cy.get('[data-testid="signup-steptwo-password"]').type('badPass')
        cy.get('[data-testid="input-error"]').contains('password is invalid').should('be.visible')

    })

    it('Step 3: Empty Fields', () => {

        cy.get('[data-testid="signup-steptwo-password"]').type('{selectall}{backspace}aabbcc112233!?')
        cy.get('[data-testid="signup-steptwo-submit"]').click()

        cy.get('[data-testid="signup-stepthree-address"]').click()
        cy.get('[data-testid="signup-stepthree-postcode"]').click()
        cy.get('[data-testid="signup-stepthree-city"]').click()
        cy.get('[data-testid="signup-stepthree-depositLimit"]').click()

        cy.get('.signup-container').click()

        cy.get(':nth-child(1) > .help > [data-testid="input-error"]').contains('Please fill this in').should('be.visible')
        cy.get(':nth-child(2) > .help > [data-testid="input-error"]').contains('Please fill this in').should('be.visible')
        cy.get(':nth-child(3) > .help > [data-testid="input-error"]').contains('Please fill this in').should('be.visible')
        cy.get(':nth-child(6) > .help > [data-testid="input-error"]').contains('Please fill this in').should('be.visible')

    })

    it('Step 3: Invalid Fields', () => {

        cy.get('[data-testid="signup-stepthree-address"]').type('!notRoad')
        cy.get('[data-testid="signup-stepthree-postcode"]').type('!notZIP')
        cy.get('[data-testid="signup-stepthree-city"]').type('!notCity')
        cy.get('[data-testid="signup-stepthree-depositLimit"]').type('00')
        
        cy.get('.signup-container').click()

        cy.get(':nth-child(1) > .help > [data-testid="input-error"]').contains('Only alphanumeric characters allowed').should('be.visible')
        cy.get(':nth-child(2) > .help > [data-testid="input-error"]').contains('Only alphanumeric characters allowed').should('be.visible')
        cy.get(':nth-child(3) > .help > [data-testid="input-error"]').contains('Only alphabetic characters allowed').should('be.visible')
        cy.get(':nth-child(6) > .help > [data-testid="input-error"]').contains('Only numbers allowed').should('be.visible')

    })

    it('Step 4: Empty Fields', () => {

        cy.get('[data-testid="signup-stepthree-address"]').type('{selectall}{backspace}1, Fake Rd.')
        cy.get('[data-testid="signup-stepthree-postcode"]').type('{selectall}{backspace}ABC123')
        cy.get('[data-testid="signup-stepthree-city"]').type('{selectall}{backspace}City')
        cy.get('[data-testid="signup-stepthree-depositLimit"]').type('{selectall}{backspace}99')
        cy.get('[data-testid="signup-stepthree-submit"]').click()

        cy.get('[data-testid="signup-stepfour-firstname"]').click()
        cy.get('[data-testid="signup-stepfour-surname"]').click()
        cy.get('[data-testid="signup-stepfour-dob"]').click()

        cy.get('.signup-container').click()

        cy.get(':nth-child(1) > .help > [data-testid="input-error"]').contains('Please fill this in').should('be.visible')
        cy.get(':nth-child(2) > .help > [data-testid="input-error"]').contains('Please fill this in').should('be.visible')
        cy.get('.field.is-grid-column-full > .help > [data-testid="input-error"]').contains('Please fill this in').should('be.visible')

    })

    it('Step 4: Invalid Fields', () => {

        cy.get('[data-testid="signup-stepfour-firstname"]').type('!notName')
        cy.get('[data-testid="signup-stepfour-surname"]').type('!notSurname')
        cy.get('[data-testid="signup-stepfour-dob"]').type('01012020')

        cy.get('.signup-container').click()

        cy.get(':nth-child(1) > .help > [data-testid="input-error"]').contains('Only alphabetic characters allowe').should('be.visible')
        cy.get(':nth-child(2) > .help > [data-testid="input-error"]').contains('Only alphabetic characters allowe').should('be.visible')
        cy.get('.field.is-grid-column-full > .help > [data-testid="input-error"]').contains('You must be 18 years and over').should('be.visible')

    })

})
