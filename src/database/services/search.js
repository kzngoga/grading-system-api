import User from '../models/user';
import Course from '../models/course';
import Department from '../models/department';
import Student from '../models/student';
import Teacher from '../models/teacher';


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
      case 'courses':
        Collection = Course;
        query = { name: { $regex: `.*${payload}.*`, $options: 'i' } };
        break;
      case 'departments':
        Collection = Department;
        query = { name: { $regex: `.*${payload}.*`, $options: 'i' } };
        break;
      case 'students':
        Collection = Student;
        query = ({
          $or: [{ firstname: { $regex: `.*${payload}.*`, $options: 'i' } },
            { lastname: { $regex: `.*${payload}.*`, $options: 'i' } }]
        });
        break;
      case 'teachers':
        Collection = Teacher;
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
