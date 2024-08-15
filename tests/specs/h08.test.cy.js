describe('template spec', () => {
  const screenWidth = 800;
  const sides = ['left', 'right'];

  beforeEach(() => {
    cy.viewport(screenWidth, 600);
    cy.visit('../../exercises/08-separate-axes/index.html');
  });

  it('Horizontal axes should be initialized and positioned correctly', () => {
    cy.window().its('Highcharts').then(Highcharts => {
      const chart = Highcharts.charts[0];
      expect(chart, 'chart should be initialized').to.exist;

      let leftAxis, rightAxis;
      chart.yAxis.forEach((yAxis, i) => {
        expect(yAxis, `yAxis ${i}: min should be 0`).to.have.property('min', 0);
        expect(yAxis, `yAxis ${i}: max should be 100`).to.have.property('max', 100);
        expect(yAxis.len, `yAxis ${i}: width should be less than a half of the viewport width`).to.lessThan(screenWidth / 2);

        if (yAxis.reversed) {
          leftAxis = yAxis;
        } else {
          rightAxis = yAxis;
        }
      });

      expect(leftAxis, 'left axis should be initialized').to.exist;
      expect(rightAxis, 'right axis should be initialized').to.exist;
      expect(leftAxis.left, 'left axis should be positioned on the left').to.be.equal(chart.plotLeft);
      expect(rightAxis.left, 'right axis should be positioned on the right').to.be.greaterThan(chart.plotWidth / 2);
    });
  });

  it('Vertical axes should be hidden', () => {
    cy.window().its('Highcharts').then(Highcharts => {
      const chart = Highcharts.charts[0];
      expect(chart, 'chart should be initialized').to.exist;

      expect(chart.xAxis[0].visible, 'xAxis should be hidden').to.be.false;
    });
  });

  it('Series should be set correctly', () => {
    cy.window().its('Highcharts').then(Highcharts => {
      const chart = Highcharts.charts[0];

      const realSeries = {};
      const mockSeries = {};
      for (const s of chart.series) {
        const side = s.yAxis.reversed ? 'left' : 'right';
        if (s.options.enableMouseTracking) {
          realSeries[side] = s;
        } else {
          mockSeries[side] = s;
        }

        expect(s.data.length, 'Every series should have 5 points').to.be.equal(5);
      }

      for (const sideId in sides) {
        const side = sides[sideId];
        const oppositeSide = sides[1 - sideId];
        const mock = mockSeries[side];
        const real = realSeries[side];

        expect(mock, `The ${side} mock (non-hoverable) series exists`).to.exist;
        expect(mock.visible, `The ${side} mock series is visible`).to.be.true;

        expect(real, `The ${side} real (hoverable) series exists`).to.exist;
        expect(real.visible, `The ${side} real series is visible`).to.be.true;
        
        const mockZIndex = mock.options.zIndex ?? 0;
        const realZIndex = real.options.zIndex ?? 0;
        if (mockZIndex === realZIndex) {
          expect(mock.index, `The ${side} mock series should have a lower index than the real series`).to.be.lessThan(real.index);
        } else {
          expect(realZIndex, `The ${side} real series should have a higher z-index than the mock series`).to.be.greaterThan(mockZIndex);
        }

        expect(mock.yData, `Every point in the ${side} mock series should be 100`).to.deep.equal([100, 100, 100, 100, 100]);
        
        const grouping = (mock.options.grouping ?? true) && (real.options.grouping ?? true);
        expect(grouping, `The ${side} series should have grouping disabled`).to.be.false;

        expect(mock.options.dataLabels.enabled ?? false, `The ${side} mock series should have data labels disabled`).to.be.false;
        expect(real.options.dataLabels.enabled, `The ${side} real series should have data labels enabled`).to.be.true;

        expect(real.options.dataLabels.inside, `The ${side} real series should have data labels inside the bars`).to.be.true;
        expect(real.options.dataLabels.align, `The ${side} real series should have data labels aligned to the ${oppositeSide}`).to.be.equal(oppositeSide);
      }
    });
  });
});
