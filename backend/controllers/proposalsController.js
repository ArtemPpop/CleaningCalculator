const proposalsService = new BaseService('proposals');

export const getProposals = async (req, res) => {
  try {
    res.json(await proposalsService.getAll());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch proposals' });
  }
};

export const createProposal = async (req, res) => {
  try {
    const item = await proposalsService.create(req.body, [
      'client_id', 'object_id', 'total_cost', 'cost_without_vat', 'vat']);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create proposal' });
  }
};