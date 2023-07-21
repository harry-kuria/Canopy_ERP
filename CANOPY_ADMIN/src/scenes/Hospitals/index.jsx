import { useState, useEffect } from "react";
import axios from 'axios';
import DeleteIcon from "@mui/icons-material/DeleteOutline"
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleDelete = (id) => {
    axios.delete(`http://18.191.22.39:5000/facilities/${id}`).then(() => {
      setData(data.filter((doctor) => doctor.id !== id));
    });}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://18.191.22.39:5000/facilities");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "facilityname",
      headerName: "Facility Name",
      flex: 1,
      cellClassName: "name-column--cell",
      
    },
    {
      field: "facilityaddress",
      headerName: "Facility Address",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email Address",
      flex: 1,
      
    },
    {
      field: "contact",
      headerName: "Contact Info",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "services",
      headerName: "Service Offered",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      
    },
    {
      field: "level",
      headerName: "Level",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      right: '20px',
      renderCell: (params) => (
        <DeleteIcon 
        className="deleteIcon" 
        style={{cursor:"pointer"}}
        onClick={() => handleDelete(params.row.id)}
        />
        
      ),
    },
    
    
  ];

  return (
    <Box m="20px">
      <Header 
  title="HOSPITALS"
  subtitle="Get to View All Hospitals"
  style={{ color: "aqua" }}
 
/>

      <Box
      
        m="40px 0 0 0"
        height="75vh"
        
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            
            
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            color: 'aqua',
            wordWrap:"none"
            
          },
          "& .name-column--cell": {
            color: 'aqua',
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
            
          },
          
        }}
      >
        <DataGrid checkboxSelection rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
