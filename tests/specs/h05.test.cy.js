describe('template spec', () => {
  const p1 = [500, 200]; // click position
  const p2 = [300, 250]; // mousemove position

  beforeEach(() => {
    cy.viewport(800, 600);
    cy.visit('../../exercises/05-click-mousemove-cursor/index.html');
  });

  it('chart should exist', () => {
    cy.get('.highcharts-container').should('be.visible');
  });

  it('the `mouse-circle` should follow the mouse', () => {
    cy.get('.highcharts-container').trigger('mousemove', ...p2);

    cy.get('.mouse-circle').should('be.visible')
      .should('have.attr', 'cx', `${p2[0]}`)
      .should('have.attr', 'cy', `${p2[1]}`);
  });

  it('the `chart-circle` and `chart-text` should be created on click', () => {
    cy.get('.highcharts-container').trigger('click', ...p1);

    cy.get('.chart-circle').should('be.visible')
    .should('have.attr', 'cx', `${p1[0]}`)
    .should('have.attr', 'cy', `${p1[1]}`);

    cy.get('.chart-text').should('be.visible');
  });

  it('position of the `chart-circle` and `chart-text` should be correct after window resize', () => {
    cy.get('.highcharts-container').trigger('click', ...p1);

    cy.window().its('Highcharts').then(Highcharts => {
      const chart = Highcharts.charts[0];
      const xAxis = chart.xAxis[0];
      const yAxis = chart.yAxis[0];

      const x = xAxis.toValue(p1[0]);
      const y = yAxis.toValue(p1[1]);

      cy.get('.chart-text').should('contain', `x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`);

      cy.viewport(400, 500);

      const pX = xAxis.toPixels(x);
      const pY = yAxis.toPixels(y);

      cy.get('.chart-circle')
        .should('have.attr', 'cx', `${pX}`,)
        .should('have.attr', 'cy', `${pY}`);
    });
  });
});
