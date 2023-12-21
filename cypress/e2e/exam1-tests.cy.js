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
        /// <reference types = "cypress"/>  


//shared with students 
//Test 1 - test the "add post" form

it('Testing the "add Post" form', () => {
    cy.visit('http://localhost:8080/api/addpost')
    cy.contains('Add Post')
    cy.get('input').length > 2
    cy.get('button').should('exist')
    cy.get('button').should('be.visible').and('be.enabled')
})

//Test 2  - Test the "Sign up" form when password is not valid

it('Testing the sign up form when password is not valid', () => {
    cy.visit('http://localhost:8080/api/signup')
    cy.get('label').length > 2
    cy.get('input').length > 2
    cy.get('button').should('exist')
    cy.get('button').should('have.css', 'display')
    cy.get('h3').should('contain', 'SignUp')

    cy.get('[type="email"]').type('eliisabet@gmail.com')
    cy.get('[type="password"]').type('parool')
    cy.get(".SignUp").should("have.class","SignUp")
    cy.get("button").should('be.visible')
    cy.contains('Password must be at least 8 characters and less than 16 characters, it must include a capital letter and at least one number')
}) 

//Test 3 - Testing the "Add post" page 

it('Testing the "Add post" page', () => {
    cy.visit('http://localhost:8080/api/addpost')
    cy.wait(20)
    cy.get('#title').type('new post')
    cy.wait(20)
    cy.get('#body').type('new post')
    cy.wait(20)
    cy.get("button").click
   
}) 

//Test 4 - Testing the "all posts page and the link to the "a post" page" 

it.skip('all posts page/link to a Post page', () => {
    cy.visit('http://localhost:8080/api/allposts')
    cy.wait(20)
    cy.get(".singlepost:first").click();
    cy.get("ul > :nth-child(1)").contains("Title").click();
}) 

//Test 5 - Test modifying a post in the "a post" page" 
it('modifying a post', () => {
    cy.visit('http://localhost:8080/api/apost/1') // :id = 1 assuming that you have a post with such id
    cy.wait(2000)
    cy.get('#title').clear().type('next post title')
        // clear() will clear the text before writing  an input
    cy.wait(2000)
    cy.get('#body').clear().type("next post body")
    cy.wait(20)
    cy.get(".updatePost").click()
    cy.wait(20)
}) 

//Test 6 - Deleting a post in the "a post" page

it('deleting a post', () => {
    cy.visit('http://localhost:8080/api/apost/1') // :id = 1 assuming that you have a post with such id
    cy.get('.deletePost').click();
    cy.wait(20)
    }) 

//========================== Basic API requests =========================

//Test 7 - testing  Get all request  from  an API for and check the returned ID
it("Get all posts", function() {
    cy.request("GET", "http://localhost:3000/api/posts", {}).then((res) => {
        cy.log(res.body)
        expect(res.body['0']).have.property('id')
        expect(res.body['0']).have.property('title')
        expect(res.body['0']).have.property('body')

        let post = res.body
        assert.isArray(post, 'value is array')
    });
}) 

//Test 8 - testing  Get request  from  an API for a post based on its ID, and check the returned ID

it("Get a post based on its id", function() {
    let postId = 2 //Change the value to an id of a post in your database
    cy.request("GET", `http://localhost:3000/api/posts/${postId}`, {}).then((res) => {
        cy.log(res.body.id)
        expect(res.body.id).to.equal(postId)
            // expect(res.body.title).to.equal('Post 1') //post title in my database
    });
}) 

//Test 9 - testing  Post request  to an API

it("Add post request", function() {
    cy.request('POST', 'http://localhost:3000/api/posts', {
            "title": "Post 4",
            "body": "Post body 4",
            "urllink": "Post 4 urllink"
        })
        .then((res) => {
            cy.log(res.body)
            let post = res.body.rows['0'].id
            expect(post).to.not.be.null; // to guarantee  that the post has been added
            cy.log('post is added')
        });
}) 


//Test 10 - testing  Update request  to an API

// Test 10 - testing Update request to an API
it("Update a post request", function () {
    // Replace the placeholder values with actual data
    let postIdToUpdate = 3;
    let updatedPostData = {
      "title": "Updated Post Title",
      "body": "Updated Post Body",
      "urllink": "Updated Post Urllink"
    };
  
    cy.request('PUT', `http://localhost:3000/api/posts/${postIdToUpdate}`, updatedPostData)
      .then((res) => {
        cy.log(res.body);
        let updatedPost = res.body.rows[0].id;
        expect(updatedPost).to.not.be.null;
        cy.log('Post is updated');
      });
  });

//Test 11 - testing  Delete request  to an API

it("Delete a post request", function() {
    cy.request("Delete", 'http://localhost:3000/api/posts/3',{

    }).then((res) => {
        cy.log(res.body)
        let post = res.body.rows['0'].id
        expect(post).to.not.be.null; // to guarantee  that the post has been added
        cy.log('post is deleted')
    });
}) 
// Test 11 - testing Delete request to an API
it("Delete a post request", function () {
    // Replace the placeholder value with the actual post ID to delete
    let postIdToDelete = 3;
  
    cy.request('DELETE', `http://localhost:3000/api/posts/${postIdToDelete}`)
      .then((res) => {
        cy.log(res.body);
        let deletedPost = res.body.rows[0].id;
        expect(deletedPost).to.not.be.null;
        cy.log('Post is deleted');
      });
  });
  
}) */