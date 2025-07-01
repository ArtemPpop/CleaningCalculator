const internalService = new BaseService('internal_zones');

export const getInternalZones = async (req, res) => {
  try {
    res.json(await internalService.getAll());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch internal zones' });
  }
};

export const createInternalZone = async (req, res) => {
  try {
    const item = await internalService.create(req.body, [
      'object_id', 'name', 'type', 'area',
      'cleaning_main', 'cleaning_support', 'cleaning_manual', 'cleaning_mechanical', 'cleaning_complex',
      'frequency', 'time_of_day']);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create internal zone' });
  }
};