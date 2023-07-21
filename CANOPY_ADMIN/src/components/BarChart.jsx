import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [doctorCount, setDoctorCount] = useState([]);
  const [nurseCount, setNurseCount] = useState(0);
  const [physiotherapistCount, setPhysiotherapistCount] = useState(0);
  const [nurseAssistantCount, setNurseAssistantCount] = useState(0);
  const [specialistCount, setSpecialistCount] = useState(0);

  useEffect(() => {
    axios.get('http://18.191.22.39:5000/doctor/items/count')
      .then(res => setDoctorCount(parseInt(res.data.count)))
      .catch(err => console.log(err));
      

    axios.get('http://18.191.22.39:5000/nurse/items/count')
      .then(res => setNurseCount(parseInt(res.data.count)))
      .catch(err => console.log(err));

    axios.get('http://18.191.22.39:5000/physiotherapist/items/count')
      .then(res => setPhysiotherapistCount(parseInt(res.data.count)))
      .catch(err => console.log(err));

    axios.get('http://18.191.22.39:5000/nurse_assistant/items/count')
      .then(res => setNurseAssistantCount(parseInt(res.data.count)))
      .catch(err => console.log(err));

    axios.get('http://18.191.22.39:5000/other/items/count')
      .then(res => setSpecialistCount(parseInt(res.data.count)))
      .catch(err => console.log(err));

  }, []);

  return (
    <ResponsiveBar
      data={[
        {
          country: "D",
          "Doctors": doctorCount,
          "DoctorsColor": "hsl(229, 70%, 50%)",
          
        },
        {
          country: "N",
          Nurses: nurseCount,
          NursesColor: "hsl(111, 70%, 50%)",
          
        },
        {
          country: "C",
          "CNAs": nurseAssistantCount,
          "CNAsColor": "hsl(72, 70%, 50%)",
          
        },
        {
          country: "P",
          "Physio": physiotherapistCount,
          "PhysioColor": "hsl(257, 70%, 50%)",
          
        },
        {
          country: "O",
          "Other": specialistCount,
          "OtherColor": "hsl(190, 70%, 50%)",
          
        },
        
      ]}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["Doctors", "Nurses", "CNAs", "Physio", "Other"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
