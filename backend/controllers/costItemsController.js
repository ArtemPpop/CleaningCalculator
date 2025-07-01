const costItemService = new BaseService('cost_items');

export const getCostItems = async (req, res) => {
  try {
    res.json(await costItemService.getAll());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cost items' });
  }
};

export const createCostItem = async (req, res) => {
  try {
    const item = await costItemService.create(req.body, [
      'object_id', 'name', 'unit', 'monthly', 'yearly', 'percent', 'comment']);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create cost item' });
  }
};