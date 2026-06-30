const express = require('express');
const routes = express.Router();

const UsersController = require('./controllers/UsersController');
const EmpresasController = require('./controllers/EmpresasController');
const ProductsController = require('./controllers/ProductsController');
const PedidosController = require('./controllers/PedidosController');
const GruposController = require('./controllers/GruposController');
const LinhasController = require('./controllers/LinhasController');
const EfipayController = require('./controllers/EfipayController');
const CreditosController = require('./controllers/CreditosController');
const ConsumosController = require('./controllers/ConsumosController');
const EmitentesController = require('./controllers/EmitentesController');
const DestinatariosController = require('./controllers/DestinatariosController');

routes.get('/', (request, response) => {
    response.json({
        message: 'Bem-vindo ao servidor BackNfe!',
    });
});

routes.post('/signIn', UsersController.signIn);
routes.post('/newuser', UsersController.newuser);
routes.get('/searchUser/:cpf', UsersController.searchUser);
routes.get('/busUser/:idUsr', UsersController.busUser);
routes.post('/loginCpf', UsersController.loginCPF);

routes.get('/empresas', EmpresasController.index);
routes.post('/newempresa', EmpresasController.create);
routes.get('/searchEmp/:idCnpj', EmpresasController.searchEmp);

routes.get('/emitentes', EmitentesController.index);
routes.get('/searchEmi/:idCnpj', EmitentesController.searchEmi);

routes.get('/destinatarios', DestinatariosController.index);
routes.get('/searchDes/:idCnpj', DestinatariosController.searchDes);
routes.get('/searchDesNome/:razao', DestinatariosController.searchDesNome);

routes.get('/produtos', ProductsController.index);
routes.post('/newproduct', ProductsController.create);
routes.get('/detproduct/:proId', ProductsController.detProduct);
routes.get('/searchPro/:idPro', ProductsController.searchPro);
routes.get('/linprodutos/:idLnh', ProductsController.lnhProdutos);

routes.get('/pedidos', PedidosController.index);
routes.get('/searchPed/:idPed', PedidosController.searchPed);
routes.post('/cnfPedido', PedidosController.cnfPedido);

routes.get('/grupos', GruposController.index);
routes.post('/newgrupo', GruposController.create);

routes.get('/creditos', CreditosController.index);
routes.post('/newcredito', CreditosController.create);
routes.post('/cnfRecarga', CreditosController.cnfRecarga);
routes.get('/searchSaldo/:id', CreditosController.searchSaldo);

routes.get('/linhas/:idGrp', LinhasController.index);
routes.post('/newlinha', LinhasController.create);

routes.post('/authorize', EfipayController.auth);
routes.post('/webhook', EfipayController.webhook);
routes.post('/certificado', EfipayController.certificado);

routes.get('/consumos', ConsumosController.index);
routes.post('/newconsumo', ConsumosController.create);


module.exports = routes;
