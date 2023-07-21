import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Person";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

const Dashboard = () => {
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
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CANOPY ADMIN DASHBOARD" subtitle="Welcome to your dashboard" />

        
      </Box>

    </Box>
  );
};

export default Dashboard;
