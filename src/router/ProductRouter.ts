import { Request, Response, Router } from 'express';
import Post from '../models/Product';

export class ProductRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    // получить все посты в бд
    public all(req: Request, res: Response): void {
        Post.find()
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.json({ error });
            });
    }

    // получить один пост по значению 'slug'
    public one(req: Request, res: Response): void {
        const { id } = req.params;

        Post.findOne({ id })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // создать новый пост
    public create(req: Request, res: Response): void {
        const {
            name,
            id,
            category,
            featuredImage,
            price,
            tax,
            status,
        } = req.body;

        const post = new Post({
            name,
            id,
            category,
            featuredImage,
            price,
            tax,
            status,
        });

        post
            .save()
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // обновить пост по 'slug'
    public update(req: Request, res: Response): void {
        const { id } = req.body;
        console.log(id);
        Post.findOneAndUpdate({ id }, req.body)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // удалить пост по 'slug'
    public delete(req: Request, res: Response): void {
        const { id } = req.body;

        Post.findOneAndRemove({ id })
            .then(() => {
                res.status(204).end();
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public routes() {
        this.router.get('/', this.all);
        this.router.get('/:id', this.one);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const productRoutes = new ProductRouter();
productRoutes.routes();

export default productRoutes.router;