import {
  LineChart,
  Line,
  XAxis,
  // YAxis,
  // CartesianGrid,
  Tooltip,
} from 'recharts'

const data = [
  { name: '20歲以下', value: 0 },
  { name: '21~25歲', value: 3 },
  { name: '26~30歲', value: 1 },
  { name: '31~35歲', value: 3 },
  { name: '36~40歲', value: 1 },
  { name: '41~45歲', value: 3 },
  { name: '46~50歲', value: 0 },
  { name: '51~55歲', value: 3 },
  { name: '56~60歲', value: 0 },
  { name: '60歲以上', value: 0 },
]

export default function App() {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 5, bottom: 5 }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name" />
      {/* <YAxis /> */}
      <Tooltip label={'apple'} />
      <Line type="monotone" name="應徵人數" dataKey="value" stroke="#8884d8" />
    </LineChart>
  )
}
