import { useEffect, useState } from "react";
import TableComponent from "../../components/common/TableComponent";
import { deleteData, getData } from "../../api/Api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SlideInPanel from "../../components/common/SlideInPanel";
import AdminForm from "./TransactionsForm";
function Transactions() {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 4 },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "contactNo",
      headerName: "Contact Number",
      flex: 2,
    },
    {
      field: "_Active",
      headerName: "Status",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <span style={{ color: "green" }}>Active</span>
        ) : (
          <span style={{ color: "red" }}>Inactive</span>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            sx={{
              color: "blue",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
              },
            }}
            onClick={() => {
              handleEdit(params.row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "red",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)", // Optional hover effect
              },
            }}
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

  const getAdmins = async () => {
    setLoading(true);
    try {
      const response = await getData("/api/v1/admins", {});
      console.log("Fetched users:", response);
      setRows(response.data);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row) => {
    console.log(row.id);
    const response = await deleteData(`/api/v1/admins/delete/${row.id}`, {});
    getAdmins();
  };

  const handleEdit = async (row) => {
    setSelectedAdminData({
      id: row.id,
      name: row.name,
      email: row.email,
      contact: row.contactNo,
    });
    setOpen(true);
  };

  const handleAdd = async () => {
    setSelectedAdminData({
      id: 0,
      name: "",
      email: "",
      contact: "",
    });
    setOpen(true);
  };

  const [selectedAdminData, setSelectedAdminData] = useState({});

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Admin</h1>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button variant="outlined" style={{ marginRight: 16 }}>
            <FileDownloadIcon style={{ marginRight: 8 }} />
            <label>Export</label>
          </Button>
          <Button variant="contained" onClick={handleAdd}>
            <Add style={{ marginRight: 8 }} />
            <label>Add</label>
          </Button>
        </div>
      </div>

      <TableComponent
        rows={rows}
        columns={columns}
        // initialState={{ pagination: { paginationModel } }}
        sx={{ border: 0 }}
      />
      <SlideInPanel
        open={open}
        onClose={() => setOpen(false)}
        title={selectedAdminData.id > 0 ? "Update Admin" : "Add Admin"}
      >
        <AdminForm
          initialValues={selectedAdminData}
          onClose={() => {
            setOpen(false);
            getAdmins();
          }}
        />
      </SlideInPanel>
    </div>
  );
}

export default Transactions;
