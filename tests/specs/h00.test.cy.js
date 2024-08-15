describe("00-initial-chart-tests", () => {
  beforeEach("passes", () => {
    cy.visit("../../exercises/00-initial-chart/index.html");
  });

  it("should check if series are drawn correctly", () => {
    cy.window()
      .its("Highcharts")
      .then((Highcharts) => {
        const chart = Highcharts.charts[0];

        const expectedValues = {
          column: {
            pointsLength: 5,
            color: "#1E90FF",
            specificAssertions: (series) => {
              assert.strictEqual(
                series.points[2].y === 0 ||
                  series.points[2].y === undefined ||
                  series.points[2].y === null,
                true,
                "The third point of the column series should be equal to 0, undefined, or null"
              );
            },
          },
          line: {
            pointsLength: 6,
            color: "#32CD32",
            symbol: "square",
          },
          spline: {
            pointsLength: 6,
            color: "#FF4500",
            symbol: "triangle-down",
          },
        };

        assert.strictEqual(chart.series.length, 3, "There are three series.");

        chart.series.forEach((series) => {
          const { type, points, color, symbol } = series;

          const expected = expectedValues[type];
          if (!expected) {
            throw new Error(`Unexpected series type: ${type}`);
          }

          assert.strictEqual(
            type,
            type,
            `There's one ${type} series on the chart`
          );
          assert.strictEqual(
            points.length,
            expected.pointsLength,
            `There are ${expected.pointsLength} points in the ${type} series`
          );
          assert.strictEqual(
            color,
            expected.color,
            `The ${type} series is ${expected.color}`
          );

          if (expected.symbol) {
            assert.strictEqual(
              symbol,
              expected.symbol,
              `The ${type} series symbol is ${expected.symbol}`
            );
          }

          if (expected.specificAssertions) {
            expected.specificAssertions(series);
          }
        });
      });
  });

  it("should check if axes are set correctly", () => {
    cy.window()
      .its("Highcharts")
      .then((Highcharts) => {
        const chart = Highcharts.charts[0];

        assert.strictEqual(
          chart.xAxis[0].userOptions.title.text,
          "xAxis title",
          "xAxis title should be named: xAxis title"
        );

        assert.strictEqual(
          chart.yAxis[0].userOptions.title.text,
          "yAxis title",
          "yAxis title should be named: yAxis title"
        );
        assert.strictEqual(
          chart.yAxis[0].userOptions.labels.style.color,
          "#32CD32",
          "yAxis labels color should be set to green"
        );
        assert.strictEqual(
          chart.yAxis[0].userOptions.labels.format,
          "{text} k",
          'yAxis labels should have "k" at the end'
        );
      });
  });

  it("should check minor chart elements settings", () => {
    cy.window()
      .its("Highcharts")
      .then((Highcharts) => {
        const chartOptions = Highcharts.charts[0].userOptions;

        expect(
          chartOptions.title.text,
          'The chart title should be set to "Highcharts chart"'
        ).to.equal("Highcharts chart");
        expect(
          chartOptions.title.align,
          "The chart title should be aligned to the left"
        ).to.equal("left");

        expect(
          chartOptions.subtitle.text,
          'The subtitle should be set to "With modified default elements"'
        ).to.equal("With modified default elements");
        expect(
          chartOptions.subtitle.align,
          "The subtitle should be aligned to the left"
        ).to.equal("left");

        expect(
          chartOptions.legend.align,
          "The legend should be aligned to the left"
        ).to.equal("left");
        expect(
          chartOptions.legend.verticalAlign,
          "The legend should be vertically aligned to the top"
        ).to.equal("top");

        expect(
          chartOptions.credits.text,
          'The credits text should be set to "Highcharts website"'
        ).to.equal("Highcharts website");
        expect(
          chartOptions.credits.position.align,
          "The credits should be aligned to the left"
        ).to.equal("left");
      });
  });

  it("should check if default colors and symbols were set by Highcharts.setOptions", () => {
    cy.window().then((win) => {
      const defaultOptions = win.Highcharts.getOptions();

      expect(defaultOptions.colors).to.deep.equal(
        ["#1E90FF", "#32CD32", "#FF4500"],
        "Colors (blue, green and red) should be set through .setOptions"
      );
      expect(defaultOptions.symbols).to.deep.equal(
        ["square", "triangle-down", "circle"],
        "Symbols (square, triangle-down and circle) should be set through .setOptions"
      );
    });
  });

  it("should check if two modules are loaded", () => {
    cy.window()
      .its("Highcharts")
      .then((Highcharts) => {
        const chart = Highcharts.charts[0];
        const modules = ["exporting", "accessibility"];

        modules.forEach((module) => {
          expect(chart[module], `${module} should be imported`).to.exist;
        });
      });
  });
});
