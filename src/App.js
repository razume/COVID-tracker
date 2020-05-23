import React, { useState, useEffect } from "react";
import "./App.css";
import Countries from "./resources/countries.json";
import { alphabetical, formatDate, formatDateSmall } from "./utils/utils";
import NavBar from "./components/NavBar";
import SimpleSelect from "./components/Select";
import InfoBubble from "./components/InfoBubble";
import axios from "axios";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function App() {
  const today = formatDate(new Date());

  const [country1, setCountry1] = useState("");
  const [summary, setSummary] = useState({});
  const [globalDeaths, setGlobalDeaths] = useState(0);
  const [globalRecoveries, setGlobalRecoveries] = useState(0);
  const [data1, setData1] = useState([]);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    setInterval(0);
    axios.get("https://api.covid19api.com/summary").then((response) => {
      setSummary(response.data);
      setGlobalDeaths(response.data.Global.TotalDeaths);
      setGlobalRecoveries(response.data.Global.TotalRecovered);
    });
  }, []);

  useEffect(() => {
    console.log("today's date", today);
    axios
      .get(
        `https://api.covid19api.com/total/country/${country1}/status/confirmed?from=2020-03-01T00:00:00Z&to=${endDate}T00:00:00Z`
      )
      .then((response) => setData1(response.data));
  }, [country1, endDate]);

  return (
    <div className="App">
      <NavBar />
      <h2>Covid-19 Tracking by Country</h2>
      {country1 ? <h1>{country1.toUpperCase()}</h1> : ""}
      <AreaChart
        width={830}
        height={250}
        data={data1}
        margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fc0324" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#fc0324" stopOpacity={0.35} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="Date"
          tickFormatter={formatDateSmall}
          interval={9}
          //padding={{ left: 30 }}
        />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Cases"
          stroke="#fc0324"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
      <SimpleSelect setCountry1={setCountry1} />
      {summary ? (
        <div>
          <InfoBubble
            label="Global deaths"
            value={globalDeaths.toLocaleString()}
          />
          <InfoBubble
            label="Global recoveries"
            value={globalRecoveries.toLocaleString()}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
