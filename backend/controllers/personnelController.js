const personnelService = new BaseService('personnel');

export const getPersonnel = async (req, res) => {
  try {
    res.json(await personnelService.getAll());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch personnel' });
  }
};

export const createPersonnel = async (req, res) => {
  try {
    const item = await personnelService.create(req.body, [
      'object_id', 'title', 'shift_duration', 'schedule', 'work_time',
      'amount_per_shift', 'total_amount', 'work_area', 'work_type', 'season']);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create personnel' });
  }
};