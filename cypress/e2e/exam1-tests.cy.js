/// <reference types = "cypress"/>  

it('Test 1', () => {
    cy.visit('http://localhost:8080/routemanagement')
    cy.get('h2').contains('Routes Management Pannel')
    cy.get('button').should('contain', 'Add Route')
    cy.get('#dateAdd').should('have.attr', 'placeholder')
});

it('Test 2', () => {
    cy.visit('http://localhost:8080/routemanagement')
    cy.wait(20)
    cy.get('#from').type('Põlva')
    cy.wait(20)
    cy.get('#to').type('Helsinki')
    cy.wait(20)
    cy.get('#cost').type(10)
    cy.wait(20)
    cy.get('#departuretime').type('09:00:00')
    cy.wait(20)
    cy.get('#dateAdd').type('2022-03-03')
    cy.wait(20)
    //to specify which button
    cy.get(".addRoute").should('contain', "Add Route").click()
}) 

it("Test 3", function() {
    cy.request('POST', 'http://localhost:3000/api/routes', {
            "fromcity": "Parnu",
            "tocity": "Tartu",
            "cost": 12,
            "departuretime": "12:00:00",
            "departuredate": "2022-03-24",
        })
        .then((res) => {
            cy.log(res.body)
            let route = res.body.rows['0'].id
            expect(route).to.not.be.null; // to guarantee  that the route has been added
            cy.log('route is added')
        });
}) 
//tests if the bus information is visible
it("Test 4", () => {
    cy.visit("http://localhost:8080/allbusses")
    cy.get('#model').should('have.attr', 'placeholder')
    cy.get('#model').type("Toyota")
    cy.get('button').should('contain', 'Show bus information')
    cy.get("button").should('be.visible')
    cy.get('button').click()
    cy.contains("The bus has 27 seats.")
})


















/* it('Test 2', () => {
    cy.visit('http://localhost:8080/routemanagement')
    //to be add by you
    cy.get('#fromcityAdd').type('Rome')
    cy.get('#tocityAdd').type('Florence')
    cy.get('#costAdd').type(24)
    cy.get('#timeAdd').type('06:00:00')
    cy.get('#dateAdd').type('2022-03-24')
    cy.get('.add').click()
}) */

/* API */
/* it("Test 3 - API - Add route request", function() {
    cy.request('POST', 'http://localhost:3000/api/routes', {
        //to be add by you
            "fromcity": "Parnu",
            "tocity": "Tartu",
            "cost": 12,
            "departuretime": "12:00:00",
            "departuredate": "2022-03-24"
        })
        .then((res) => {
            cy.log(res.body)
            let post = res.body.rows['0'].id
            expect(post).to.not.be.null;
            cy.log('a route is added')
        });
}) */