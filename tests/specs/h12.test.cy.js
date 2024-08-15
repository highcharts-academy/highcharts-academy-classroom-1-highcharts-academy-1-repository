describe('template spec', () => {
  beforeEach(() => {
    cy.visit('../../exercises/12-histogram-point-select/index.html');
  });

  it('should check if there are two x-axes and two y-axes', () => {
    cy.window().its('Highcharts').then(Highcharts => {
      const chart = Highcharts.charts[0];

      expect(chart.xAxis, "There should be two x-axes").to.have.length(2);
      expect(chart.yAxis, "There should be two y-axes").to.have.length(2);
    });
  });

  it('should check if the axes have the correct titles and positions', () => {
    cy.window().its('Highcharts').then(Highcharts => {
      const chart = Highcharts.charts[0];

      for (const axis of chart.axes) {
        if (axis.opposite) {
          expect(axis.options.title.text, `The opposite ${axis.coll} should have the title 'Histogram'`).to.equal('Histogram');
        } else {
          expect(axis.options.title.text, `The normal ${axis.coll} should have the title 'Values'`).to.equal('Values');
        }
      }
    });
  });

  it('should check if there is a scatter series joined to the histogram series', () => {
    cy.window().its('Highcharts').then(Highcharts => {
      const chart = Highcharts.charts[0];
      const histogramSeries = chart.series.filter(series => series.type === 'histogram');
      const scatterSeries = chart.series.filter(series => series.type === 'scatter');

      expect(histogramSeries, "There should be one histogram series").to.have.length(1);
      expect(scatterSeries, "There should be one scatter series").to.have.length(1);

      expect(histogramSeries[0].baseSeries, "The histogram series should be joined to the scatter series").to.equal(scatterSeries[0]);
    });
  });

  it('should check if the histogram series is selectable', () => {
    cy.window().its('Highcharts').then(Highcharts => {
      const chart = Highcharts.charts[0];
      const histogramSeries = chart.series.find(series => series.type === 'histogram');

      expect(histogramSeries.options.allowPointSelect, "The histogram series should be selectable").to.be.true;
    });
  });

  it('should check if the inactive state is turned off for all the series', () => {
    cy.window().its('Highcharts').then(Highcharts => {
      const chart = Highcharts.charts[0];
      let allInactiveStatesDisabled = true;
      for (const series of chart.series) {
        if (series.options.states?.inactive?.enabled !== false) {
          allInactiveStatesDisabled = false;
          break;
        }
      }

      expect(allInactiveStatesDisabled, "All the series should have the inactive state turned off").to.be.true;
    });
  });

  it('should check if clicking on the histogram column selects the proper points', () => {
    const pointLengths = [2, 4, 7, 3, 5, 6];
    for (let i = 0; i < 6; i++) {
      cy.get('.highcharts-histogram-series .highcharts-point').eq(i).click();
      cy.get('.highcharts-scatter-series .highcharts-point-select')
        .should('have.length', pointLengths[i])
        .then(points => {
          for (const { point } of points) {
            expect(point).to.have.property('y', i + 1);
          }
        });
    }

    cy.get('.highcharts-histogram-series .highcharts-point-select').should('have.length', 1);
  });
});
