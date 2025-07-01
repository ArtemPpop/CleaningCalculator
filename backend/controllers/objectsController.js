const objectsService = new BaseService('objects');

export const getObjects = async (req, res) => {
  try {
    res.json(await objectsService.getAll());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch objects' });
  }
};

export const createObject = async (req, res) => {
  try {
    const item = await objectsService.create(req.body, [
      'client_id', 'name', 'address', 'type', 'work_schedule', 'start_date', 'contract_duration']);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create object' });
  }
};