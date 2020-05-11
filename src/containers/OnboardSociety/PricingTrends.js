import React, {PureComponent} from 'react';
import {BarChart, Bar, Cell} from 'recharts';

export default class PricingTrends extends PureComponent {
  state = {
    data: [
      {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: 'Page H',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: 'Page I',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: 'Page J',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ],
    activeIndex: 0,
  };

  handleClick = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const {activeIndex, data} = this.state;

    return (
      <div>
        <BarChart
          width={240}
          height={80}
          data={data}
          margin={{top: 0, right: 0, bottom: 0, left: 0}}
        >
          <Bar dataKey="uv" onClick={this.handleClick}>
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? '#E0607E' : '#d8d2c7'}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    );
  }
}
