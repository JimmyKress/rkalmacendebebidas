import express, { Application } from 'express'; 
import cors from 'cors';
import morgan from 'morgan';
import bebidasRoutes from './routes/bebidasRoutes';
//import fileUploadRoutes from './routes/fileUploadRoutes';
import path from 'path';

const app = express();
class Server{
    public app: Application = express();
       constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json()); //recibo peticiones de las aplicaciones-cliente en formato json
        this.app.use(cors()); //Angular podra pedir los datos al servidor
        this.app.use(morgan("dev")); //me permite ver en consola lo que los clientes estan haciendo
        this.app.use((req, res, next) => {
            console.log(`Ruta cargada: ${req.method} ${req.url}`);
            next();
        });
        // Servir archivos estáticos desde la carpeta
        this.app.use('/img', express.static(path.resolve('img'))); 
        // Servir archivos estáticos de la aplicación Angular
        //this.app.use(express.static(path.join(__dirname, 'front-end/dist/front-end')));

    }

    routes(): void{
        this.app.use('/api/bebidas', bebidasRoutes);
        // Redirigir todas las demás solicitudes a index.html
        //this.app.get('*', (req, res) => {
        //    res.sendFile(path.join(__dirname, 'front-end/dist/front-end/browser/index.html'));
        //});    
        this.app.use('https://rkalmacendebebidas.com/api/bebidas', bebidasRoutes);

    }

    start(): void{
       // this.app.listen(this.app.get('port'), () => {
       //     console.log("El servidor esta en funcionamiento, servidor:", this.app.get('port'));
       // })
        this.app.listen(this.app.get('port'), '0.0.0.0', () => {
            console.log("El servidor esta  en funcionamiento, puerto:", this.app.get('port'));
          })
    }
}

const server = new Server();
server.start();
