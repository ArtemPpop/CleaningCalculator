import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clientsRoutes from './routes/clients.js';
import objectsRoutes from './routes/objects.js';
import proposalsRoutes from './routes/proposals.js';
import servicePeriodsRoutes from './routes/servicePeriods.js';
import internalZonesRoutes from './routes/internalZones.js';
import externalZonesRoutes from './routes/externalZones.js';
import materialsRoutes from './routes/materials.js';
import extraServicesRoutes from './routes/extraServices.js';
import equipmentRoutes from './routes/equipment.js';
import personnelRoutes from './routes/personnel.js';
import costItemsRoutes from './routes/costItems.js';
import calculateRoutes from './routes/calculate.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/clients', clientsRoutes);
app.use('/api/objects', objectsRoutes);
app.use('/api/proposals', proposalsRoutes);
app.use('/api/service_periods', servicePeriodsRoutes);
app.use('/api/internal_zones', internalZonesRoutes);
app.use('/api/external_zones', externalZonesRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/extra_services', extraServicesRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/cost_items', costItemsRoutes);
app.use('/api/calculate', calculateRoutes);

app.get('/', (_, res) => res.send('Cleaning Services API Running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
