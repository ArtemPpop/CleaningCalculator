import BaseService from '../db/BaseService.js';
const service = new BaseService('service_periods');

export const getServicePeriods = async (req, res) => {
  try {
    res.json(await service.getAll());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service periods' });
  }
};

export const createServicePeriod = async (req, res) => {
  try {
    const item = await service.create(req.body, ['object_id', 'season', 'date_from', 'date_to']);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service period' });
  }
};