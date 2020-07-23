import React, { useRef, useEffect } from "react";
import "./Doughnut.scss";
import { Box } from "@material-ui/core";
import { Doughnut as DoughnutChart } from "react-chartjs-2";

/**
 * @typedef {import('chart.js').ChartData} ChartData
 * @typedef {import('chart.js').ChartOptions} ChartOptions
 * @typedef {Object} DoughnutColorOptions
 * @property {Array<String>} backgroundColor Background HTML color.
 * @property {string} [borderColor] Border HTML color.
 */

/**
 *
 * @typedef {Object} DefaultProps
 * @property {Array<Number>} values Chart values.
 * @property {Array<String>} labels Chart labels.
 * @property {DoughnutColorOptions} colorOptions
 */

/**
 *
 * @param {DefaultProps} props
 */

const Doughnut = (props) => {
  const { values, labels, colorOptions } = props;
  const chartRef = useRef(null);
  const legendId = `legendBox${Math.random()}`;
  /**
   * @type ChartData
   */
  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: colorOptions.backgroundColor,
        borderColor: colorOptions.borderColor,
      },
    ],
  };

  /**
   * @type ChartOptions
   */
  const options = {
    layout: {
      padding: {
        right: 100,
      },
    },
    legend: {
      display: false,
      position: "right",
    },
    legendCallback: function (chart) {
      var ul = document.createElement("ul");
      chart.data.datasets.forEach(function (dataset, datasetIndex) {
        let backgroundColor = colorOptions.backgroundColor;
        labels.forEach(function (label, labelIndex) {
          ul.innerHTML += `
                  <li>
                     <span class="circle" style="background-color: ${backgroundColor[labelIndex]}"></span>
                     <span class="value">${dataset.data[labelIndex]}%</span>
                     <span class="quote">${label}</span>
                   </li>
                `;
        });
      });
      return ul.outerHTML;
    },
    cutoutPercentage: 65,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  useEffect(() => {
    document.getElementById(legendId).innerHTML = chartRef.current.chartInstance.generateLegend();
  }, [data, labels]);

  return (
    <Box
      className="doughnut"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <DoughnutChart data={data} options={options} ref={chartRef} />
      <Box className="legendBox" id={legendId}></Box>
    </Box>
  );
};

export default Doughnut;
