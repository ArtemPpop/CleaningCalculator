const externalService = new BaseService('external_zones');

export const getExternalZones = async (req, res) => {
  try {
    res.json(await externalService.getAll());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch external zones' });
  }
};

export const createExternalZone = async (req, res) => {
  try {
    const item = await externalService.create(req.body, [
      'object_id', 'name', 'type', 'area',
      'cleaning_main', 'cleaning_support', 'cleaning_manual', 'cleaning_mechanical', 'cleaning_complex',
      'frequency']);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create external zone' });
  }
};