import React, { useState, useRef, useCallback } from "react";
import "./LineChart.scss";
import { Box } from "@material-ui/core";
import CustomToolip from "../../CustomTooltip";
import { Line } from "react-chartjs-2";
import { isEqual } from "lodash";

/**
 * @typedef {import('chart.js').ChartData} Chart.ChartData
 * @typedef {import('chart.js').ChartOptions} Chart.ChartOptions
 * @typedef {import('chart.js').ChartTooltipModel} Chart.ChartTooltipModel
 * @typedef {import('../../CustomTooltip/CustomTooltip').PosType} PosType
 */

/**
 * @typedef {Object} ChartData
 * @property {Array<Number>} values Chart values.
 * @property {Array<String>} labels Chart labels.
 */

/**
 * @typedef {Object} ChartColorOptions
 * @property {string} borderColor Border HTML color.
 *
 */

// Memoize the chart and only re-renders when the data is updated.
// Otherwise it will be rendered everytime the toolip is trigered(state update).
const MemoizedLine = React.memo(Line, (prevProps, nextProps) =>
  isEqual(prevProps.data, nextProps.data),
);

/**
 * @typedef {Object} LineChartPropTypes
 * @property {ChartColorOptions} colorsOptions Chart colors.
 * @property {ChartData} chartData Chart dataset.
 * @property {function} tooltipFormat Function to format data based on selected value.
 */

/**
 * Provides a wrapper to display a line chart.
 *
 * @param {LineChartPropTypes} props Component properties.
 * @returns {JSX.Element} Component JSX.
 */
const LineChart = (props) => {
  const { chartData, colorsOptions, tooltipFormat } = props;
  const chartRef = useRef(null);
  const [tooltipContent, setTooltipContent] = useState(<></>);
  const [pos, setPos] = useState(/** @type {PosType} */ (null));
  const [isTooltipVisible, setTooltipVisibility] = useState(false);

  /**
   * Callback to handle tooltip display.
   * @param {Chart.ChartTooltipModel} tooltip Tooltip model.
   * @returns {void}
   */
  const showTooltip = (tooltip) => {
    // if chart is not defined, return early
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    // hide the tooltip when chartjs determines you've hovered out
    if (tooltip.opacity === 0) {
      setTooltipVisibility(false);
      return;
    }

    // Set tooltip position.
    const left = tooltip.caretX;
    const top = tooltip.caretY;
    setPos({ top, left });

    // Set values for display of data in the tooltip
    const content = tooltipFormat(tooltip.dataPoints[0]);
    setTooltipContent(content);

    // Show tooltip
    setTooltipVisibility(true);
  };
  const showTooltipCallback = useCallback(showTooltip, [chartData]);

  /**
   * @type Chart.ChartData
   */
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "",
        fill: false,
        data: chartData.values,
        borderColor: colorsOptions.borderColor,
        backgroundColor: "transparent",
        borderWidth: 3,
        // pointHitRadius: 20,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 4,
        pointHoverBorderColor: "#5200c5",
        pointHoverBackgroundColor: "#fff",
      },
    ],
  };

  /**
   * @type Chart.ChartOptions
   */
  const options = {
    layout: {
      padding: {
        top: 10,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    hover: {
      intersect: false,
      mode: "index",
      animationDuration: 0,
    },
    tooltips: {
      mode: "index",
      intersect: false,
      position: "nearest",
      displayColors: false,
      enabled: false,
      custom: showTooltipCallback,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          stacked: false,
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
    // events: ["click", "touchstart", "touchmove"],
  };

  const plugins = [
    {
      id: "responsiveGradient",
      /**
       * @typedef {Object} ChartWithScales
       * @property {*} scales
       *
       * @typedef {Chart & ChartWithScales} ExtendedChart
       */

      /**
       * Fill chart with gradient on layout change.
       *
       * @param {ExtendedChart} chart Chart instance.
       * @returns {void}
       */
      afterLayout: (chart /* options */) => {},
    },
  ];

  return (
    <Box className="lineChart">
      <CustomToolip
        classes={{ tooltip: "customTooltip" }}
        open={isTooltipVisible}
        placement="top-start"
        pos={pos}
        title={tooltipContent}
      >
        <MemoizedLine data={data} options={options} plugins={plugins} ref={chartRef} />
      </CustomToolip>
    </Box>
  );
};

export default LineChart;
