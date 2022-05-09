import logo from "./logo.svg";
import "./App.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { getVels } from "./hooks/useVel";
import { getAngles } from "./hooks/usePosition";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function App() {
  const dataPosition = getAngles();
  const [dataVels, generalData] = getVels(dataPosition);
  console.log(dataVels);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LineChart
          width={1200}
          height={500}
          data={dataPosition}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line name="teta2" type="monotone" dataKey="teta2" stroke="#8884d8" />
          <Line name="teta3" type="monotone" dataKey="teta3" stroke="#f55812" />
          <Line name="teta4" type="monotone" dataKey="teta4" stroke="#f19af3" />
          <Line name="teta5" type="monotone" dataKey="teta5" stroke="#812e7a" />
          <Line name="teta6" type="monotone" dataKey="teta6" stroke="#ff0000" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend verticalAlign="top" height={36} />
          <XAxis dataKey="xAxis" />
          <Tooltip />
          <YAxis />
        </LineChart>
        <LineChart
          width={1200}
          height={500}
          data={dataVels}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line name="w2" type="monotone" dataKey="w2" stroke="#8884d8" />
          <Line name="w3" type="monotone" dataKey="w3" stroke="#f55812" />
          <Line name="w4" type="monotone" dataKey="w4" stroke="#f19af3" />
          <Line name="w5" type="monotone" dataKey="w5" stroke="#812e7a" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend verticalAlign="top" height={36} />
          <XAxis dataKey="xAxis" />
          <Tooltip />
          <YAxis />
        </LineChart>
      </header>
    </div>
  );
}

export default App;
