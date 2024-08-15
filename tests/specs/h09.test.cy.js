describe("Line Chart Exercise", () => {
  beforeEach("passes", () => {
    cy.visit("../../exercises/09-visible-points-zoom/index.html");
  });

  it('should check if the chart has 100 random integer values and "xy" zoom', () => {
    cy.window()
      .its("Highcharts")
      .then((Highcharts) => {
        const chart = Highcharts.charts[0];
        const series = chart.series[0];

        expect(series.data.length, "Series should have 100 points").to.equal(
          100
        );
        expect(
          chart.options.chart.zoomType,
          "Zoom type should be 'xy'"
        ).to.equal("xy");
      });
  });

  it("should check if the visible points label updates correctly on zoom", () => {
    cy.window()
      .its("Highcharts")
      .then((Highcharts) => {
        const chart = Highcharts.charts[0];

        cy.get("text")
          .contains("Visible points:")
          .should("have.text", `Visible points: ${100}`)
          .then(() => {
            chart.xAxis[0].setExtremes(45, 50);
            cy.get("text")
              .contains("Visible points:")
              .should(
                "have.text",
                `Visible points: ${
                  chart.series[0].points.filter((point) => point.isInside)
                    .length
                }`
              );
          });
      });
  });

  it("should check if highest value points have red labels and red dots on xAxis", () => {
    cy.window()
      .its("Highcharts")
      .then((Highcharts) => {
        const chart = Highcharts.charts[0];
        const series = chart.series[0];
        const dataMax = Math.max(...series.yData);
        const maxPoints = series.points.filter((point) => point.y === dataMax);

        cy.get(".highcharts-root")
          .find("text.max-point-label")
          .should("have.length", maxPoints.length)
          .each(($el) => {
            cy.wrap($el)
              .should("have.text", dataMax)
              .then(($element) => {
                const rect = $element[0].getBoundingClientRect();
                const x = rect.x;
                const y = rect.y;

                let matchFound = false;
                for (const p of maxPoints) {
                  if (
                    Math.abs(p.plotX + p.series.chart.plotLeft - x) < 30 &&
                    Math.abs(p.plotY + p.series.chart.plotTop - y) < 30
                  ) {
                    assert.closeTo(
                      p.plotX + p.series.chart.plotLeft,
                      x,
                      30,
                      "The x-coordinate of the custom max point label should be close to the max point x-coordinate."
                    );
                    assert.closeTo(
                      p.plotY + p.series.chart.plotTop,
                      y,
                      30,
                      "The y-coordinate of the custom max point label should be close to the max point y-coordinate."
                    );
                    matchFound = true;
                    break;
                  }
                }

                if (!matchFound) {
                  assert.fail("No matching points found for the element.");
                }
              });
          });

        cy.get(".highcharts-root")
          .find("circle.x-axis-point")
          .should("have.length", maxPoints.length)
          .each(($el) => {
            cy.wrap($el).then(($element) => {
              const rect = $element[0].getBoundingClientRect();
              const x = rect.x;

              let matchFound = false;
              for (const p of maxPoints) {
                if (Math.abs(p.plotX + p.series.chart.plotLeft - x) < 30) {
                  assert.closeTo(
                    p.plotX + p.series.chart.plotLeft,
                    x,
                    30,
                    "The x-coordinate of the custom xAxis circle should be close to the max point x-coordinate."
                  );
                  matchFound = true;
                  break;
                }
              }

              if (!matchFound) {
                assert.fail("No matching xAxis circles found for the element.");
              }
            });
          });
      });
  });
});
