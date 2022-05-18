import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

const ChartComponent = ({ parseDataFn }) => {
  const parsedDataObj = parseDataFn();
  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Users",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {y}",
        },
      },
    },
    series: [
      {
        name: "Population",
        data: Object.keys(parsedDataObj).map((country) => ({
          name: country,
          y: parsedDataObj[country].length,
        })),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ChartComponent;
