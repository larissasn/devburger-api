import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body);

    const userEmailOrPasswordIncorrect = () =>
      response
        .status(401)
        .json({ error: 'Make sure your password or email are correct' });

    if (!isValid) {
      return userEmailOrPasswordIncorrect();
    }

    const { email, password } = request.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return userEmailOrPasswordIncorrect();
    }

    const isSamePassword = await user.checkPassword(password);
    if (!isSamePassword) {
      return userEmailOrPasswordIncorrect();
    }
    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new SessionController();
