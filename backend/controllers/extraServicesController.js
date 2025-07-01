const extraService = new BaseService('extra_services');

export const getExtraServices = async (req, res) => {
  try {
    res.json(await extraService.getAll());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch extra services' });
  }
};

export const createExtraService = async (req, res) => {
  try {
    const item = await extraService.create(req.body, [
      'object_id', 'name', 'unit', 'frequency', 'zone', 'quantity', 'included_in_price']);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create extra service' });
  }
};