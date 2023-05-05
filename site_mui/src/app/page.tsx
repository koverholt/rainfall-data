"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function RainfallContent() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(
      'https://rainfall-data-67ugd5bjtq-uc.a.run.app',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site: 2959 }),
      }
    )
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const rainfallRow1 = [
    {
      amount: "0.52 in",
      timeWindow: 'Today',
    },
    {
      amount: '0.52 in',
      timeWindow: 'Last 5 days',
    },
    {
      amount: '0.52 in',
      timeWindow: 'This year',
    },
  ];

  const rainfallRow2 = [
    {
      amount: '0.52 in',
      timeWindow: 'Yesterday',
    },
    {
      amount: '0.52 in',
      timeWindow: 'Last 30 days',
    },
    {
      amount: '0.52 in',
      timeWindow: 'Last year',
    },
  ];

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Central Texas Rainfall Totals
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 3, pb: 3 }}>
        <Typography variant="h6" align="left" color="text.secondary" component="p">
          Showing rainfall from the Marble Falls 4 WSW LCRA Hydromet weather gauge
        </Typography>
        <div>
          {data ? <pre>{data["rainfall_amounts"][0]["Since midnight"]}</pre> : 'Loading...'}
        </div>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems="flex-end" sx={{ pb: 4 }}>
          {rainfallRow1.map((dataPoint) => (
            <Grid
              item
              key={dataPoint.amount}
              xs={12}
              sm={dataPoint.amount === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={dataPoint.amount}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography component="h5" variant="h6" color="text.primary">
                      {dataPoint.timeWindow}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          {rainfallRow2.map((dataPoint) => (
            <Grid
              item
              key={dataPoint.amount}
              xs={12}
              sm={dataPoint.amount === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={dataPoint.amount}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography component="h5" variant="h6" color="text.primary">
                      {dataPoint.timeWindow}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default function Rainfall() {
  return <RainfallContent />;
}
