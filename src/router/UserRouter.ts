import { Request, Response, Router } from 'express';
import User from '../models/User';

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    User.find()
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
        return error;
      });
  }

  public one(req: Request, res: Response): void {
    const { username } = req.params;

    User.findOne({ username })//.populate('posts')
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  public create(req: Request, res: Response): void {
    const { info, username, email, password } = req.body;

    const user = new User({
      info,
      username,
      email,
      password,
    });

    user
      .save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  public update(req: Request, res: Response): void {
    const { username } = req.params;

    User.findOneAndUpdate({ username }, req.body)
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const { username } = req.params;

    User.findOneAndRemove({ username })
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  // установка маршрутов и обработчиков
  public routes() {
    this.router.get('/', this.all);
    this.router.get('/:username', this.one);
    this.router.post('/', this.create);
    this.router.put('/:username', this.update);
    this.router.delete('/:username', this.delete);
  }
}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;