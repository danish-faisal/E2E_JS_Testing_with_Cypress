describe('Text box with max characters', () => {
    it('displays the appropriate remaining characters count', () => {
        cy.visit('http://localhost:3000/example-3');

        cy.get('[data-cy=last-name-chars-left-count]').as('charsLeftSpan');
        cy.get('[data-cy=input-last-name]').as('charInput');

        // cy.get('@charsLeftSpan').invoke('text').should('equal', '15');
        cy.get('@charsLeftSpan')
            .then($charsLeftSpan => {
                expect($charsLeftSpan.text()).to.equal('15');
            });

        // The 'wrap' command -> takes a jQuery element that we have as the result of a Cypress command and convert it back to a form that we can use Cypress commands on again
        // to make Cypress style assertions instead of Chai expect assertions
        // cy.get('@charsLeftSpan')
        //     .then($charsLeftSpan => {
        //         cy.wrap($charsLeftSpan).invoke('text').should('equal', '15');
        //     });

        cy.get('@charInput').type('hello');

        cy.get('@charsLeftSpan').invoke('text').should('equal', '10');

        cy.get('@charInput').type(' my friend');

        cy.get('@charsLeftSpan').invoke('text').should('equal', '0');
    });

    it('prevents the user form typing more characters once max is reached', () => {
        cy.visit('http://localhost:3000/example-3');

        cy.get('[data-cy=input-last-name]').as('charInput');

        cy.get('@charInput').type('abcdefghijklmnopqrstuvwxyz');
        cy.get('@charInput').should('have.attr', 'value', 'abcdefghijklmno');
    });
});