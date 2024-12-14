import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { readStats, graphicLine, graphicBar, graphicArea, graphicPie } from '../api/grafico';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GroupAdd, TrendingUp, Event, ChangeCircle } from '@mui/icons-material';

// Estilo para las tarjetas de los gráficos
const GraphCard = styled(Card)(({ theme }) => ({
  marginBottom: '20px',
  boxShadow: theme.shadows[5],
  borderRadius: '8px',
  padding: '16px',
  backgroundColor: '#f9f9f9',
  textAlign: 'center',
}));

const Graphics = () => {
  const [stats, setStats] = useState({});
  const [userGrowth, setUserGrowth] = useState([]);
  const [citaGrowth, setCitaGrowth] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [monthlyCitas, setMonthlyCitas] = useState([]);
  const [designDistribution, setDesignDistribution] = useState([]);

  // Obtener estadísticas generales
  useEffect(() => {
    readStats()
      .then(response => {
        setStats(response.data);
      })
      .catch(error => console.error("Error fetching stats:", error));
  }, []);

  // Gráfico de línea (crecimiento mensual de usuarios y citas)
  useEffect(() => {
    graphicLine()
      .then(response => {
        setUserGrowth(response.data.userGrowth);
        setCitaGrowth(response.data.citaGrowth);
      })
      .catch(error => console.error("Error fetching growth data:", error));
  }, []);

  // Gráfico de barras (productos más populares)
  useEffect(() => {
    graphicBar()
      .then(response => {
        setTopProducts(response.data);
      })
      .catch(error => console.error("Error fetching top products:", error));
  }, []);

  // Gráfico de área (incidencias mensuales de citas)
  useEffect(() => {
    graphicArea()
      .then(response => {
        setMonthlyCitas(response.data);
      })
      .catch(error => console.error("Error fetching monthly citas:", error));
  }, []);

  // Gráfico de pastel (distribución de tipos de diseño)
  useEffect(() => {
    graphicPie()
      .then(response => {
        setDesignDistribution(response.data);
      })
      .catch(error => console.error("Error fetching design distribution:", error));
  }, []);

  return (
    <div>
      <Typography variant="h2" gutterBottom align="center">Gráficos y Estadísticas</Typography>

      {/* Estadísticas generales */}
      <Box display="flex" justifyContent="space-around" flexWrap="wrap" marginBottom="30px">
        <GraphCard>
          <CardContent>
            <GroupAdd sx={{ fontSize: 40, color: '#FF6998' }} />
            <Typography variant="h6">Total de Usuarios</Typography>
            <Typography variant="h5">{stats.totalUsers}</Typography>
          </CardContent>
        </GraphCard>

        <GraphCard>
          <CardContent>
            <TrendingUp sx={{ fontSize: 40, color: '#FF6998' }} />
            <Typography variant="h6">Cambio de Usuarios</Typography>
            <Typography variant="h5">{stats.userChange}%</Typography>
          </CardContent>
        </GraphCard>

        <GraphCard>
          <CardContent>
            <Event sx={{ fontSize: 40, color: '#FF6998' }} />
            <Typography variant="h6">Total de Citas</Typography>
            <Typography variant="h5">{stats.totalCitas}</Typography>
          </CardContent>
        </GraphCard>

        <GraphCard>
          <CardContent>
            <ChangeCircle sx={{ fontSize: 40, color: '#FF6998' }} />
            <Typography variant="h6">Cambio de Citas</Typography>
            <Typography variant="h5">{stats.citaChange}%</Typography>
          </CardContent>
        </GraphCard>
      </Box>

      {/* Gráfico de área */}
      <GraphCard>
        <CardContent>
          <Typography variant="h6">Incidencias Mensuales</Typography>
          <AreaChart width={730} height={250} data={monthlyCitas}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </CardContent>
      </GraphCard>

      {/* Gráfico de línea */}
      <GraphCard>
        <CardContent>
          <Typography variant="h6">Crecimiento Mensual</Typography>
          <LineChart width={730} height={250} data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </CardContent>
      </GraphCard>

      {/* Gráfico de barras */}
      <GraphCard>
        <CardContent>
          <Typography variant="h6">Productos Más Populares</Typography>
          <BarChart width={730} height={250} data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </CardContent>
      </GraphCard>

      {/* Gráfico de pastel */}
      <GraphCard>
        <CardContent>
          <Typography variant="h6">Distribución de Tipos de Diseño</Typography>
          <PieChart width={400} height={400}>
            <Pie data={designDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
              {designDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658'][index % 3]} />
              ))}
            </Pie>
          </PieChart>
        </CardContent>
      </GraphCard>
    </div>
  );
};

export default Graphics;
