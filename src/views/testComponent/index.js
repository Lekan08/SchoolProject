import { Settings } from "@mui/icons-material";
import { Icon } from "@mui/material";
import Tables from "examples/orgTable";
import DataTable from "examples/TableList";
import React from "react";
import { Dropdown } from "react-bootstrap";

export default function TestCompo() {
  const rows = [
    { id: 1, lastName: "Snow", firstName: { name: "Jon" }, age: 35 },
    // { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    // { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    // { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    // { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    // { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    // { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    // { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  ];
  return (
    <div className="content">
      <DataTable
        data={{
          columns: [
            {
              Header: "First Name",
              accessor: "firstName",
              renderCell: (params) => {
                console.log(params);
                return params.row.firstName.name;
              },
            },
            { Header: "Last Name", accessor: "lastName" },
            { Header: "age", accessor: "age" },
            {
              Header: "settings",
              accessor: "id",
              renderCell: (cell) => (
                <Dropdown style={{ position: "absolute" }}>
                  <Dropdown.Toggle
                    style={{ width: "5rem", height: "30px", padding: 0 }}
                    variant="info"
                    size="lg"
                  >
                    <Settings
                      sx={{
                        textAlign: "center",
                        fontSize: "18px",
                      }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      //get the id of the selected row
                      onClick={() => console.log(cell.row.id)}
                      style={{ fontweight: "bold", color: "black" }}
                    >
                      Update
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontweight: "bold", color: "black" }}
                    >
                      Cancel
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ),
            },
          ],
          //this should be the data from the API
          rows: rows,
        }}
      />
      <br />
      <Tables />
    </div>
  );
}
