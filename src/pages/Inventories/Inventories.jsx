// import { useEffect, useState } from "react";
// import TableComponent from "../../components/common/TableComponent";
// import { deleteData, getData } from "../../api/Api";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Button, IconButton, TextField } from "@mui/material";
// import { Add } from "@mui/icons-material";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import SlideInPanel from "../../components/common/SlideInPanel";
// import InventoriesForm from "./InventoriesForm";
// function Inventories() {
//   const columns = [
//     { field: "itemId", headerName: "ID", flex: 1 },
//     { field: "itemName", headerName: "Name", flex: 4 },
//     { field: "itemQuantity", headerName: "Quantity", flex: 2 },
//     {
//       field: "itemDescription",
//       headerName: "Description",
//       flex: 2,
//     },
//     {
//       field: "itemCost",
//       headerName: "Cost",
//       flex: 2,
//     },
//     {
//       field: "itemCategories",
//       headerName: "Categories",
//       flex: 2,
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

//   const getInventories = async () => {
//     setLoading(true);
//     try {
//       const response = await getData("/inventory/all", {});
//       console.log("Fetched users:", response);
//       setRows(response.data);
//     } catch (error) {
//       console.error("Fetch failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (row) => {
//     console.log(row.id);
//     const response = await deleteData(`/inventory-delete`, {
//       id: row.id,
//     });
//     getInventories();
//   };

//   const handleEdit = async (row) => {
//     setSelectedInventoriesData({
//       id: row.id,
//       name: row.name,
//       email: row.email,
//       contact: row.contactNo,
//     });
//     setOpen(true);
//   };

//   const handleAdd = async () => {
//     setSelectedInventoriesData({
//       itemName: "",
//       itemQuantity: "",
//       itemDescription: "",
//       itemCost: "",
//       categories: "",
//       branchAndInventoryId: -1,
//       applicableTaxNames: "",
//     });
//     setOpen(true);
//   };

//   const [selectedInventoriesData, setSelectedInventoriesData] = useState({});

//   useEffect(() => {
//     getInventories();
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
//         <h1>Inventories</h1>
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

//       <TableComponent rows={rows} columns={columns} sx={{ border: 0 }} />
//       <SlideInPanel
//         open={open}
//         onClose={() => setOpen(false)}
//         title={
//           selectedInventoriesData.id > 0
//             ? "Update Inventories"
//             : "Add Inventories"
//         }
//       >
//         <InventoriesForm
//           initialValues={selectedInventoriesData}
//           onClose={() => {
//             setOpen(false);
//             getInventories();
//           }}
//         />
//       </SlideInPanel>
//     </div>
//   );
// }

// export default Inventories;

import { useEffect, useState } from "react";
import TableComponent from "../../components/common/TableComponent";
import { deleteData, getData } from "../../api/Api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SlideInPanel from "../../components/common/SlideInPanel";
import InventoriesForm from "./InventoriesForm";
import "./Inventories.css"; // ✅ External CSS

function Inventories() {
  const columns = [
    { field: "itemId", headerName: "ID", flex: 1 },
    { field: "itemName", headerName: "Name", flex: 2 },
    { field: "itemQuantity", headerName: "Quantity", flex: 2 },
    {
      field: "itemDescription",
      headerName: "Description",
      flex: 2,
    },
    {
      field: "itemCost",
      headerName: "Cost",
      flex: 2,
    },
    {
      field: "categories",
      headerName: "Categories",
      flex: 2,
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
            onClick={() => {
              handleEdit(params.row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            className="icon-button-red"
            onClick={() => {
              handleDelete(params.row);
            }}
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
  const [selectedInventoriesData, setSelectedInventoriesData] = useState({});

  const getInventories = async () => {
    setLoading(true);
    try {
      const response = await getData("/inventory/all", {});
      const processed = response.data.map((item) => ({
        ...item,
        id: item.itemId, // ✅ Ensures MUI DataGrid has a unique ID
      }));
      setRows(processed);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row) => {
    await deleteData(`/inventory-delete`, { id: row.id });
    getInventories();
  };

  const handleEdit = (row) => {
    setSelectedInventoriesData(row);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedInventoriesData({
      itemName: "",
      itemQuantity: "",
      itemDescription: "",
      itemCost: "",
      itemCategories: "",
      branchAndInventoryId: -1,
      applicableTaxNames: "",
    });
    setOpen(true);
  };

  useEffect(() => {
    getInventories();
  }, []);

  return (
    <div>
      <div className="inventories-header">
        <h1>Inventories</h1>
        <div className="inventories-actions">
          <Button variant="outlined">
            <div className="inventories-button-label">
              <FileDownloadIcon />
              <label>Export</label>
            </div>
          </Button>
          <Button variant="contained" onClick={handleAdd}>
            <div className="inventories-button-label">
              <Add />
              <label>Add</label>
            </div>
          </Button>
        </div>
      </div>

      <TableComponent
        rows={rows}
        columns={columns}
        sx={{ border: 0 }}
        loading={loading}
      />

      <SlideInPanel
        open={open}
        onClose={() => setOpen(false)}
        title={
          selectedInventoriesData?.id > 0
            ? "Update Inventories"
            : "Add Inventories"
        }
      >
        <InventoriesForm
          initialValues={selectedInventoriesData}
          onClose={() => {
            setOpen(false);
            getInventories();
          }}
        />
      </SlideInPanel>
    </div>
  );
}

export default Inventories;
