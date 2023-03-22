import { Area, AreaChart, Tooltip } from 'recharts';

const data: { year: number; value: number }[] = [];

const rand = 300;
for (let i = 0; i < 7; i++) {
  const d = {
    year: 2000 + i,
    value: Math.random() * (rand + 50) + 100,
  };

  data.push(d);
}

type Props = {
  width?: number;
  height?: number;
};

const AreaChartPrice = ({ width = 500, height = 200 }: Props) => {
  return (
    <AreaChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 5, right: 20, bottom: 30, left: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#58BD7D" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#58BD7D" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Tooltip />
      <Area
        type="monotone"
        dataKey="value"
        stroke="#58BD7D"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
};

export default AreaChartPrice;
