import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';

const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));
  return {
    chart: {
      height: 500,
    },
    title: {
      text: 'Tổng ca nhiễm',
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F3585B'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: 'right',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Tổng Ca nhiễm',
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

function Chart({ data }) {
  const [option, setOption] = useState({});
  const [type, setType] = useState('all');

  useEffect(() => {
    let customData = [];
    switch (type) {
      case 'all':
        customData = data;
        break;
      case '7':
        customData = data.slice(data.length - 7);
        break;
      case '30':
        customData = data.slice(data.length - 30);
        break;
      default:
        customData = data;
        break;
    }
    setOption(generateOptions(customData));
  }, [data, type]);

  return (
    <div>
      <ButtonGroup size="small">
        <Button color={type === 'all' ? 'secondary' : ''} onClick={() => setType('all')}>
          Tất cả
        </Button>
        <Button color={type === '7' ? 'secondary' : ''} onClick={() => setType('7')}>
          7 ngày
        </Button>
        <Button color={type === '30' ? 'secondary' : ''} onClick={() => setType('30')}>
          30 ngày
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </div>
  );
}

export default Chart;
