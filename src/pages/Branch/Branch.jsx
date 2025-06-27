// import { useEffect, useState } from "react";
// import TableComponent from "../../components/common/TableComponent";
// import { deleteData, getData, postData } from "../../api/Api";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Button, IconButton, TextField } from "@mui/material";
// import { Add } from "@mui/icons-material";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import SlideInPanel from "../../components/common/SlideInPanel";
// import AdminForm from "./BranchForm";
// function Branch() {
//   const columns = [
//     { field: "branchId", headerName: "Id", flex: 1 },
//     { field: "branchName", headerName: "Name", flex: 4 },
//     { field: "location", headerName: "Location", flex: 2 },
//     {
//       field: "contactInfo",
//       headerName: "Contact Number",
//       flex: 2,
//     },
//     {
//       field: "branchStatus",
//       headerName: "Status",
//       flex: 1,
//       renderCell: (params) => {
//         return params.row.active ? (
//           <span style={{ color: "green" }}>Active</span>
//         ) : (
//           <span style={{ color: "red" }}>Inactive</span>
//         );
//       },
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       sortable: false,
//       renderCell: (params) => (
//         <>
//           <IconButton
//             sx={{
//               color: "blue",
//               "&:hover": {
//                 backgroundColor: "rgba(255, 0, 0, 0.1)",
//               },
//             }}
//             onClick={() => {
//               handleEdit(params.row);
//             }}
//           >
//             <EditIcon />
//           </IconButton>
//           <IconButton
//             sx={{
//               color: "red",
//               "&:hover": {
//                 backgroundColor: "rgba(255, 0, 0, 0.1)", // Optional hover effect
//               },
//             }}
//             onClick={() => {
//               handleDelete(params.row);
//             }}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   const [loading, setLoading] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [open, setOpen] = useState(false);

//   const getBranches = async () => {
//     setLoading(true);
//     try {
//       const response = await postData("/branch/all", {});
//       console.log("Fetched users:", response);
//       setRows(response.data);
//     } catch (error) {
//       console.error("Fetch failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (row) => {
//     console.log(row.branchId);
//     const response = await deleteData(`/admins/delete`, {
//       id: row.branchId,
//     });
//     getBranches();
//   };

//   const handleEdit = async (row) => {
//     setSelectedBranchData({
//       id: row.branchId,
//       branchName: row.branchName,
//       location: row.location,
//       contactInfo: row.contactInfo,
//     });
//     setOpen(true);
//   };

//   const handleAdd = async () => {
//     setSelectedBranchData({
//       id: -1,
//       branchName: "",
//       location: "",
//       contactInfo: "",
//     });
//     setOpen(true);
//   };

//   const [selectedBranchData, setSelectedBranchData] = useState({});

//   useEffect(() => {
//     getBranches();
//   }, []);

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <h1>Branch</h1>
//         <div className="mt-4 flex md:mt-0 md:ml-4">
//           <Button variant="outlined" style={{ marginRight: 16 }}>
//             <FileDownloadIcon style={{ marginRight: 8 }} />
//             <label>Export</label>
//           </Button>
//           <Button variant="contained" onClick={handleAdd}>
//             <Add style={{ marginRight: 8 }} />
//             <label>Add</label>
//           </Button>
//         </div>
//       </div>

//       <TableComponent
//         rows={rows}
//         columns={columns}
//         // initialState={{ pagination: { paginationModel } }}
//         sx={{ border: 0 }}
//       />
//       <SlideInPanel
//         open={open}
//         onClose={() => setOpen(false)}
//         title={selectedBranchData.id > 0 ? "Update Branch" : "Add Branch"}
//       >
//         <AdminForm
//           initialValues={selectedBranchData}
//           onClose={() => {
//             setOpen(false);
//             getBranches();
//           }}
//         />
//       </SlideInPanel>
//     </div>
//   );
// }

// export default Branch;

import { useEffect, useState } from "react";
import TableComponent from "../../components/common/TableComponent";
import { deleteData, postData } from "../../api/Api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SlideInPanel from "../../components/common/SlideInPanel";
import AdminForm from "./BranchForm";
import "./Branch.css"; // ✅ Import external CSS

function Branch() {
  const columns = [
    { field: "branchId", headerName: "Id", flex: 1 },
    { field: "branchName", headerName: "Name", flex: 4 },
    { field: "location", headerName: "Location", flex: 2 },
    {
      field: "contactInfo",
      headerName: "Contact Number",
      flex: 2,
    },
    {
      field: "branchStatus",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        return params.row.active ? (
          <span className="status-active">Active</span>
        ) : (
          <span className="status-inactive">Inactive</span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            className="icon-button-blue"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            className="icon-button-red"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBranchData, setSelectedBranchData] = useState({});

  const getBranches = async () => {
    setLoading(true);
    try {
      const response = await postData("/branch/all", {});
      const processed = response.data.map((item) => ({
        ...item,
        id: item.branchId, // Ensure unique ID for MUI DataGrid
      }));
      setRows(processed);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row) => {
    await deleteData(`/admins/delete`, {
      id: row.branchId,
    });
    getBranches();
  };

  const handleEdit = (row) => {
    setSelectedBranchData({
      id: row.branchId,
      branchName: row.branchName,
      location: row.location,
      contactInfo: row.contactInfo,
    });
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedBranchData({
      id: -1,
      branchName: "",
      location: "",
      contactInfo: "",
    });
    setOpen(true);
  };

  useEffect(() => {
    getBranches();
  }, []);

  return (
    <div>
      <div className="branch-header">
        <h1>Branch</h1>
        <div className="branch-actions">
          <Button variant="outlined">
            <div className="branch-button-label">
              <FileDownloadIcon />
              <label>Export</label>
            </div>
          </Button>
          <Button variant="contained" onClick={handleAdd}>
            <div className="branch-button-label">
              <Add />
              <label>Add</label>
            </div>
          </Button>
        </div>
      </div>

      <TableComponent
        rows={rows}
        columns={columns}
        loading={loading}
        sx={{ border: 0 }}
      />

      <SlideInPanel
        open={open}
        onClose={() => setOpen(false)}
        title={selectedBranchData?.id > 0 ? "Update Branch" : "Add Branch"}
      >
        <AdminForm
          initialValues={selectedBranchData}
          onClose={() => {
            setOpen(false);
            getBranches();
          }}
        />
      </SlideInPanel>
    </div>
  );
}

export default Branch;
