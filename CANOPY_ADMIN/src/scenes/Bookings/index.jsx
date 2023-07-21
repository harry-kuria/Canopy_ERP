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
//   const handleDelete = (id) => {
//     axios.delete(`http://18.191.22.39:5000/nurse/${id}`).then(() => {
//       setData(data.filter((doctor) => doctor.id !== id));
//     });}

//     const handleApproval = (id) => {
//       axios.put(`http://18.191.22.39:5000/nurse/${id}`, { approved: 'yes' }).then(() => {
//         setData(data.filter((doctor) => {
//           if (doctor.id === id) {
//             doctor.approved = 'yes';
//           }
//           return doctor;
//         }));
//       });
//     };
//     const handleRejection = (id) => {
//       axios.put(`http://18.191.22.39:5000/nurse/${id}`, { approved: 'no' }).then(() => {
//         setData(data.filter((doctor) => {
//           if (doctor.id === id) {
//             doctor.approved = 'no';
//           }
//           return doctor;
//         }));
//       });
//     };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://18.191.22.39:5000/booking");
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
      field: "patient_first_name",
      headerName: "Patient First Name",
      flex: 1,
      cellClassName: "name-column--cell",
      
    },
    {
      field: "patient_last_name",
      headerName: "Patient Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "patient_contact",
      headerName: "Patient Contact",
      flex: 1,
      
    },
    {
      field: "patient_email_address",
      headerName: "patient Email Address",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "doctor_email_address",
      headerName: "Doctor Email Address",
      flex: 1,
    },
    {
      field: "patient_dob",
      headerName: "Patient DOB",
      flex: 1,
      
    },
    {
      field: "patient_booking_type",
      headerName: "Booking type",
      flex: 1,
    },
    {
      field: "booking_date_slot",
      headerName: "Booking Date",
      flex: 1,
    },
    {
      field: "booking_time_slot",
      headerName: "Booking Time",
      flex: 1,
    },
    
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   flex: 1,
    //   right: '20px',
    //   renderCell: (params) => (
    //     <DeleteIcon 
    //     className="deleteIcon" 
    //     style={{cursor:"pointer"}}
        
    //     />
        
    //   ),
    // },
    // {
    //   field: "verify",
    //   headerName: "Verify",
    //   flex: 1,
    //   right: '20px',
    //   renderCell: (params) => (
    //     <VerifiedIcon 
    //     className="deleteIcon" 
    //     style={{cursor:"pointer"}}
         
    //     />
        
    //   ),
    // },
    // {
    //   field: "reject",
    //   headerName: "Reject",
    //   flex: 1,
    //   right: '20px',
    //   renderCell: (params) => (
    //     <RejectIcon 
    //     className="deleteIcon" 
    //     style={{cursor:"pointer"}}
         
    //     />
        
    //   ),
    // },
    
  ];

  return (
    <Box m="20px">
      <Header 
  title="BOOKINGS"
  subtitle="Get to View All Bookings"
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
