// cypress.env.json file should not be pushed when actual environment variable are present
// add an Env variable in cypress.json in an 'env' object (or) cypress.env.json (or) pass in "npx cypress open --env var_name=var_val" command 
// alert(Cypress.env('MY_ENV_VARIABLE'));

describe('Basic page interactions', () => {
    beforeEach(() => {
        cy.visit('/example-4');
    });

    it('Sets the header text to item\'s name when double clicked', () => {
        cy.get('[data-cy=box-1-items-list] > :nth-child(2)').dblclick();

        cy.get('[data-cy=box-1-selected-name]').invoke('text').should('equal', 'Option Two');
    });

    it('displays the correct count for the number of selected checkboxes', () => {
        cy.get('[data-cy=box-2-checkboxes] :nth-child(1) input').check();

        cy.get('[data-cy=box-2-selected-count]').invoke('text').should('equal', '1');
    });

    it('displays the name of the currently selected item', () => {
        cy.get('[data-cy=box-3-dropdown]').select('Option Three');

        cy.get('[data-cy=box-3-selected-name]').invoke('text').should('equal', 'Option Three');
    });

    it('should display the name of the most recently hovered item', () => {
        cy.get('[data-cy=box-4-items-list] > :nth-child(2)').trigger('mouseover')
        // .debug(); (or)
        // .then(() => {
        //     debugger;
        // }); and open the console so that tests are paused

        cy.get('[data-cy=box-4-selected-name]').invoke('text').should('equal', 'Option Two');
    })
});