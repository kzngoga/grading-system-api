import User from '../models/user';


export default async (searchBy, payload, page, limit) => {
  try {
    let Collection;
    let query;
    let fieldsToOmit = '-__v';
    fieldsToOmit += ' ';
    switch (searchBy.toLowerCase()) {
      case 'users':
        Collection = User;
        query = ({
          $or: [{ firstname: { $regex: `.*${payload}.*`, $options: 'i' } },
            { lastname: { $regex: `.*${payload}.*`, $options: 'i' } }]
        });
        fieldsToOmit += '-password';
        break;
      default:
        // In case we implement an elastic search
        Collection = null;
        break;
    }

    return await Collection.find(query, fieldsToOmit)
      .skip((page - 1) * limit).limit(limit)
      .populate('user', 'firstname');
  } catch (error) {
    throw error;
  }
};
