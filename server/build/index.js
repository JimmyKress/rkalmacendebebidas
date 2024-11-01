"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const bebidasRoutes_1 = __importDefault(require("./routes/bebidasRoutes"));
//import fileUploadRoutes from './routes/fileUploadRoutes';
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express_1.default.json()); //recibo peticiones de las aplicaciones-cliente en formato json
        this.app.use((0, cors_1.default)()); //Angular podra pedir los datos al servidor
        this.app.use((0, morgan_1.default)("dev")); //me permite ver en consola lo que los clientes estan haciendo
        this.app.use((req, res, next) => {
            console.log(`Ruta cargada: ${req.method} ${req.url}`);
            next();
        });
        // Servir archivos estáticos desde la carpeta
        this.app.use('/img', express_1.default.static(path_1.default.resolve('img')));
        // Servir archivos estáticos de la aplicación Angular
        //this.app.use(express.static(path.join(__dirname, 'front-end/dist/front-end')));
    }
    routes() {
        this.app.use('/api/bebidas', bebidasRoutes_1.default);
        // Redirigir todas las demás solicitudes a index.html
        //this.app.get('*', (req, res) => {
        //    res.sendFile(path.join(__dirname, 'front-end/dist/front-end/browser/index.html'));
        //});    
        this.app.use('https://rkalmacendebebidas.com/api/bebidas', bebidasRoutes_1.default);
    }
    start() {
        // this.app.listen(this.app.get('port'), () => {
        //     console.log("El servidor esta en funcionamiento, servidor:", this.app.get('port'));
        // })
        this.app.listen(this.app.get('port'), '0.0.0.0', () => {
            console.log("El servidor esta  en funcionamiento, puerto:", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
