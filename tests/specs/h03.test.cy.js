describe("Highcharts Tests", () => {
  beforeEach(() => {
    cy.visit("../../exercises/03-minimal-charts/index.html");
  });

  it("should render the spline chart correctly", () => {
    cy.window()
      .its("Highcharts")
      .then((Highcharts) => {
        const matchedChart = Highcharts.charts.find(
          (chart) =>
            chart.type === "spline" || chart.series[0].type === "spline"
        );

        expect(matchedChart, "Spline chart should exist").to.exist;
        expect(
          matchedChart.series[0].data.length,
          "Spline chart should have 6 data points"
        ).to.equal(6);
      });
  });

  it("should render the areaspline chart correctly", () => {
    cy.window()
      .its("Highcharts")
      .then((Highcharts) => {
        const matchedChart = Highcharts.charts.find(
          (chart) =>
            chart.type === "areaspline" || chart.series[0].type === "areaspline"
        );

        expect(matchedChart, "Areaspline chart should exist").to.exist;
        expect(
          matchedChart.series[0].data.length,
          "Areaspline chart should have 6 data points"
        ).to.equal(6);
      });
  });

  it("should render the column chart correctly", () => {
    cy.window()
      .its("Highcharts")
      .then((Highcharts) => {
        const matchedChart = Highcharts.charts.find(
          (chart) =>
            chart.type === "column" || chart.series[0].type === "column"
        );
        const series = matchedChart.series[0];

        expect(matchedChart, "Column chart should exist").to.exist;
        expect(
          matchedChart.series[0].data.length,
          "Column chart should have 6 data points"
        ).to.equal(6);
        assert.strictEqual(
          series.points[2].y === 0 ||
            series.points[2].y === undefined ||
            series.points[2].y === null,
          true,
          "The third point of the column series should be equal to 0, undefined, or null"
        );
      });
  });

  it("should render the pie chart correctly", () => {
    cy.window()
      .its("Highcharts")
      .then((Highcharts) => {
        const matchedChart = Highcharts.charts.find(
          (chart) => chart.type === "pie" || chart.series[0].type === "pie"
        );

        expect(matchedChart, "Pie chart should exist").to.exist;
        expect(
          matchedChart.series[0].data.length,
          "Pie chart should have 3 data points"
        ).to.equal(3);
      });
  });

  it("should set global Highcharts options correctly", () => {
    cy.window().then((win) => {
      expect(
        win.Highcharts.defaultOptions.title.text,
        "Global title text should be empty"
      ).to.equal("");
      expect(
        win.Highcharts.defaultOptions.legend.enabled,
        "Global legend should be disabled"
      ).to.equal(false);
      expect(
        win.Highcharts.defaultOptions.credits.enabled,
        "Global credits should be disabled"
      ).to.equal(false);

      if (win.Highcharts.defaultOptions.yAxis.visible === false) {
        expect(
          win.Highcharts.defaultOptions.yAxis.visible,
          "Global yAxis visible should be hidden"
        ).to.equal(false);
      } else {
        expect(
          win.Highcharts.defaultOptions.yAxis.gridLineWidth,
          "Global yAxis gridLineWidth should be 0"
        ).to.equal(0);
        expect(
          win.Highcharts.defaultOptions.yAxis.title.text,
          "Global yAxis title text should be empty"
        ).to.equal("");
        expect(
          win.Highcharts.defaultOptions.yAxis.labels.enabled,
          "Global yAxis labels should be disabled"
        ).to.equal(false);
      }

      if (win.Highcharts.defaultOptions.xAxis.visible === false) {
        expect(
          win.Highcharts.defaultOptions.xAxis.visible,
          "Global xAxis visible should be hidden"
        ).to.equal(false);
      } else {
        expect(
          win.Highcharts.defaultOptions.xAxis.lineWidth,
          "Global xAxis lineWidth should be 0"
        ).to.equal(0);
        expect(
          win.Highcharts.defaultOptions.xAxis.tickLength,
          "Global xAxis tickLength should be 0"
        ).to.equal(0);
        expect(
          win.Highcharts.defaultOptions.xAxis.labels.enabled,
          "Global xAxis labels should be disabled"
        ).to.equal(false);
      }

      expect(
        win.Highcharts.defaultOptions.tooltip.outside,
        "Global tooltip should be outside"
      ).to.equal(true);

      expect(
        win.Highcharts.defaultOptions.plotOptions.series.marker.enabled,
        "Global series marker should be disabled"
      ).to.equal(false);
      expect(
        win.Highcharts.defaultOptions.plotOptions.series.dataLabels.enabled,
        "Global series dataLabels should be disabled"
      ).to.equal(false);
    });
  });
});
