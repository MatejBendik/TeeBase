import React, { useState, useEffect, Fragment } from "react";
import "./home.css";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  prva: string,
  druha: string,
  tretia: string,
  stvrta: string,
  piata: string,
  siesta: string,
  siedma: string,
  osma: string
) {
  return { name, prva, druha, tretia, stvrta, piata, siesta, siedma, osma };
}

const rows = [
  createData(
    "Pondelok",
    "ANJ",
    "ANJ",
    "ANJ",
    "4.3",
    "ANJ",
    "ANJ",
    "ANJ",
    "4.3"
  ),
  createData("Utorok", "ANJ", "ANJ", "ANJ", "4.3", "ANJ", "ANJ", "ANJ", "4.3"),
  createData("Streda", "ANJ", "ANJ", "ANJ", "4.3", "ANJ", "ANJ", "ANJ", "4.3"),
  createData("Štvrtok", "ANJ", "ANJ", "ANJ", "4.3", "ANJ", "ANJ", "ANJ", "4.3"),
  createData("Piatok", "ANJ", "ANJ", "ANJ", "4.3", "ANJ", "ANJ", "ANJ", "4.3"),
];

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          container
          justifyContent="center"
          item
          xs={12}
          md={12}
          lg={12}
          xl={12}
        >
          <h1 className="homeTitle">Vitaj v studni múdrostí</h1>
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <h2 className="homeSubtitle">Náš rozvrh:</h2>

          <Fragment>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell component="th" scope="row">
                      <strong>Deň</strong>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <strong> 1</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong> 2</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong> 3</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong> 4</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong> 5</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong> 6</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong> 7</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong> 8</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <TableCell>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            >
                              Poznámky ku dňu:
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    <b> Názov</b>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell component="th" scope="row">
                                    Písomka ANJ
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.prva}</TableCell>
                      <TableCell align="right">{row.druha}</TableCell>
                      <TableCell align="right">{row.tretia}</TableCell>
                      <TableCell align="right">{row.stvrta}</TableCell>
                      <TableCell align="right">{row.piata}</TableCell>
                      <TableCell align="right">{row.siesta}</TableCell>
                      <TableCell align="right">{row.siedma}</TableCell>
                      <TableCell align="right">{row.osma}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fragment>
        </Grid>
      </Grid>
    </Box>
  );
}
