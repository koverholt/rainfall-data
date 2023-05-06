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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );
ChartJS.defaults.backgroundColor = '#9BD0F5';
ChartJS.defaults.borderColor = '#36A2EB';
ChartJS.defaults.color = '#FFFFFF';

var chartData : any = {};

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

  chartData = {
    labels: [
      "Last 1 hour",
      "Last 3 hours",
      "Last 6 hours",
      "Last 24 hours",
      "Since midnight",
      "1 day ago",
      "2 days ago",
      "3 days ago",
      "4 days ago",
      "5 day total",
    ],
    datasets: [
      {
        label: "Rainfall Amount",
        backgroundColor: "#0ea5e9",
        borderColor: "#222222",
        color: "#222222",
        data: [
          data ? data["rainfall_amounts"][0]["Last 1 hour"] : 0,
          data ? data["rainfall_amounts"][0]["Last 3 hours"] : 0,
          data ? data["rainfall_amounts"][0]["Last 6 hours"] : 0,
          data ? data["rainfall_amounts"][0]["Last 24 hours"] : 0,
          data ? data["rainfall_amounts"][0]["Since midnight"] : 0,
          data ? data["rainfall_amounts"][0]["1 day ago"] : 0,
          data ? data["rainfall_amounts"][0]["2 days ago"] : 0,
          data ? data["rainfall_amounts"][0]["3 days ago"] : 0,
          data ? data["rainfall_amounts"][0]["4 days ago"] : 0,
          data ? data["rainfall_amounts"][0]["5 day total"] : 0,
        ],
      },
    ],
  };

  const options : any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          suggestedMin: 0,
        },
        title: {
          display: true,
          text: "Rainfall Amount (in)",
        },
      },
    },
  };

  const listOfSites = data ? data["list_of_sites"] : [];

  return (
    <ThemeProvider theme={darkTheme}>
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
            <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Central Texas Rainfall Totals
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={3} sx={{ p:4 }} alignItems="center">
        <Grid item>
          <Typography variant="h6" align="left" color="text.secondary" component="p">
            Showing rainfall from the
          </Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            disablePortal
            size="small"
            id="combo-box-demo"
            options={listOfSites}
            getOptionLabel={(data: {location: string}) => data.location}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="Marble Falls 4 WSW" />}
          />
        </Grid>
          <Grid item>
            <Typography variant="h6" align="left" color="text.secondary" component="p">
              LCRA Hydromet weather gauge
            </Typography>
          </Grid>
        </Grid>
        <Container maxWidth="lg" component="main">
          <Grid container spacing={5} alignItems="flex-end" sx={{ pb: 4 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader
                    title={data ? data["rainfall_amounts"][0]["Since midnight"] + " in" : 'Loading...'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                      p: 1,
                    }}
                  />
                  <Typography component="h5" variant="h6" color="text.primary" sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', p: 1}}>
                    Today
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader
                    title={data ? data["rainfall_amounts"][0]["5 day total"] + " in" : 'Loading...'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                        p: 1,
                    }}
                  />
                  <Typography component="h5" variant="h6" color="text.primary" sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', p: 1}}>
                    Last 5 days
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader
                    title={data ? data["rainfall_amounts"][0]["This year"] + " in" : 'Loading...'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                        p: 1,
                    }}
                  />
                  <Typography component="h5" variant="h6" color="text.primary" sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', p: 1}}>
                    This year
                  </Typography>
                </Card>
              </Grid>
          </Grid>

          <Grid container spacing={5} alignItems="flex-end" sx={{ pb: 4 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader
                    title={data ? data["rainfall_amounts"][0]["1 day ago"] + " in" : 'Loading...'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                        p: 1,
                    }}
                  />
                  <Typography component="h5" variant="h6" color="text.primary" sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', p: 1}}>
                    Yesterday
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader
                    title={data ? data["rainfall_amounts"][0]["30 day total"] + " in" : 'Loading...'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                        p: 1,
                    }}
                  />
                  <Typography component="h5" variant="h6" color="text.primary" sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', p: 1}}>
                    Last 30 days
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader
                    title={data ? data["rainfall_amounts"][0]["Last year"] + " in" : 'Loading...'}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                        p: 1,
                    }}
                  />
                  <Typography component="h5" variant="h6" color="text.primary" sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', p: 1}}>
                    Last year
                  </Typography>
                </Card>
              </Grid>
          </Grid>
        </Container>
        <Container sx={{ height: '40vh', width: '100vw', justifyContent: 'center' }}>
          <Bar options={options} data={chartData} />
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default function Rainfall() {
  return <RainfallContent />;
}
