import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import { PostRouter } from './router/PostRouter';
import { UserRouter } from './router/UserRouter';
import { ProductRouter } from './router/ProductRouter';

const postRouter = new PostRouter();
const userRouter = new UserRouter();
const productRouter = new ProductRouter();

class Server {
    // установка поля app типа express.Application
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    // конфигурация приложения
    public config(): void {
        const MONGO_URI: string = 'mongodb://192.168.99.100:27017/testcrm';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);
        // app связка
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.set('view engine', 'ejs');

        // cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS',
            );
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
            );
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    // установка маршрутов и обработчиков для app
    public routes(): void {
        const router: express.Router = express.Router();
        this.app.use('/api/v1/posts', postRouter.router);
        this.app.use('/api/v1/users', userRouter.router);
        this.app.use('/api/v1/product',productRouter.router);
    }
}

// export
export default new Server().app;
