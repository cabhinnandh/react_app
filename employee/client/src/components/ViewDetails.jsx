  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom"; 

  const ViewDetails = () => {
    const [user, setUser] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
      axios
        .get("http://localhost:8080/view")
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }, []);

    const DeleteHandle = (id) => {
      axios
        .delete(`http://localhost:8080/remove/${id}`)
        .then((response) => {
          console.log("User deleted:", response.data);
          setUser(user.filter((item) => item._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting user: ", error);
        });
    };

    const updateHandle = (item) => {
      navigate("/add", { state: { item } }); 
    };

    return (
      <TableContainer
        component={Paper}
        sx={{ margin: "20px auto", maxWidth: "800px" }}
      >
        <Typography variant="h5" textAlign="center" sx={{ margin: "10px 0" }}>
          Employee Details
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Age}</TableCell>
                <TableCell>{item.Dept}</TableCell>
                <TableCell>{item.Salary}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => DeleteHandle(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => updateHandle(item)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  export default ViewDetails;
