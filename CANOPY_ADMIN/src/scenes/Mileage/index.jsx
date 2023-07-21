import { useState, useEffect } from "react";
import axios from 'axios';
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import VerifiedIcon from "@mui/icons-material/VerifiedOutlined"
import RejectIcon from "@mui/icons-material/RedoOutlined"
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
    axios.delete(`http://localhost:4500/admin/mileage/${id}`).then(() => {
      setData(data.filter((doctor) => doctor.id !== id));
    });}

    const handleApproval = (id) => {
      axios.put(`http://localhost:4500/admin/canopy_mileages/${id}`, { approved: 'yes' }).then(() => {
        setData(data.filter((doctor) => {
          if (doctor.id === id) {
            doctor.approved = 'yes';
          }
          return doctor;
        }));
      });
    };
    const handleRejection = (id) => {
      axios.put(`http://localhost:4500/admin/canopy_mileages/${id}`, { approved: 'no' }).then(() => {
        setData(data.filter((doctor) => {
          if (doctor.id === id) {
            doctor.approved = 'no';
          }
          return doctor;
        }));
      });
    };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4500/admin/canopy_mileages");
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
      field: "carnumber",
      headerName: "Car Number",
      flex: 1,
      cellClassName: "name-column--cell",
      
    },
    
    {
      field: "carengine",
      headerName: "Car Engine",
      flex: 1,
      cellClassName: "name-column--cell",
      
    },

    {
      field: "taskdone",
      headerName: "Task Done",
      flex: 1,
      cellClassName: "name-column--cell",
      
    },

    {
      field: "distancecovered",
      headerName: "Distance Covered",
      flex: 1,
      cellClassName: "name-column--cell",
      
    },

    {
      field: "totalcost",
      headerName: "Total",
      flex: 1,
      cellClassName: "name-column--cell",
      
    },

    {
      field: "file",
      headerName: "Document",
      flex: 1,
      cellClassName: "name-column--cell",
      
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
  title="MILEAGES"
  subtitle="Get to View All Mileages"
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
