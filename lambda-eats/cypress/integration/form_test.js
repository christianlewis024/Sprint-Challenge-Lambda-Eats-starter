describe("Testing our inputs and submit our form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/form");
  });
  it("add test to inputs and submit form", function() {
    cy.get('input[name="name"]')
      .type("christian")
      .should("have.value", "christian");
    cy.get("input[name='email']")
      .type("email@email.com")
      .should("have.value", "email@email.com");
    cy.get("input[name='address']")
      .type("123 fake st")
      .should("have.value", "123 fake st");
    cy.get("#instructions")
      .type("dont forget the sauce")
      .should("have.value", "dont forget the sauce");
    cy.get("#size").select("large");
    cy.get('[type="checkbox"]')
      .check()
      .should("be.checked");
    cy.get("button").click();
  });
});
