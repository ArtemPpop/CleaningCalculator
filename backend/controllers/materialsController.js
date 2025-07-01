const materialService = new BaseService('materials');

export const getMaterials = async (req, res) => {
  try {
    res.json(await materialService.getAll());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
};

export const createMaterial = async (req, res) => {
  try {
    const item = await materialService.create(req.body, [
      'object_id', 'name', 'brand', 'unit', 'quantity', 'delivery_scheme', 'included_in_price', 'category']);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create material' });
  }
};
