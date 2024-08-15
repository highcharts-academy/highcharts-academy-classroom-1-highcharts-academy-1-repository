describe('01-simple-column', () => {
  beforeEach('passes', () => {
    cy.visit('../../exercises/07-boosted-chart/index.html');
  });

  it('should check if there is a small scatter series with fewer than 10,000 points and not boosted', () => {
    cy.window().its('Highcharts').then(Highcharts => {
      const chart = Highcharts.charts[0];
      const scatterSeries = chart.series.filter(series => series.type === 'scatter');

      expect(scatterSeries, "There should be one scatter series").to.have.length(1);

      const smallSeries = scatterSeries.find(series => series.data.length < 10000);
      expect(smallSeries, "One scatter series should have fewer than 10,000 points").to.exist;
      expect(smallSeries.boosted, "This series should not be in boost mode").to.be.false;
    });
  });

  it('should check if there is a large scatter series with at least 10,000 points and boosted', () => {
    cy.window().its('Highcharts').then(Highcharts => {
      const chart = Highcharts.charts[0];
      const columnSeries = chart.series.filter(series => series.type === 'column');

      expect(columnSeries, "There should be one column series").to.have.length(1);

      const largeSeries = columnSeries.find(series => series.xData.length >= 10000);
      expect(largeSeries, "One scatter series should have at least 10,000 points").to.exist;
      expect(largeSeries.boosted, "This series should be in boost mode").to.be.true;
    });
  });
});
