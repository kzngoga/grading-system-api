import SearchService from '../database/services/search';
import out from '../helpers/response';

export default async (req, res) => {
  try {
    const { searchBy } = req.params;
    const { q, page, limit } = req.query;
    const results = await SearchService(
      searchBy,
      q,
      parseInt(page, 10),
      parseInt(limit, 10)
    );
    return results.length > 0
      ? out(res, 200, 'Results retrieved', results)
      : out(res, 404, 'No results', null, 'NOT_FOUND');
  } catch (error) {
    return out(res, 500, error.message || error, null, 'SERVER_ERROR');
  }
};
