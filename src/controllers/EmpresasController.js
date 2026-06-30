const { Console } = require('console');
const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        const empresas = await connection('empresas')
        .orderBy('empRazSocial')
        .select('*');
    
        return response.json(empresas);
    },    
        
    async create(request, response) {
        const {empCnpj, empRazSocial, empNomFantasia, empInsEstadual, empEndereco, empNumero, empComplemento, empBairro, empCidade, empCep, empUf, empCodIbge, empTelefone, empContato, empEmail} = request.body;
        let status = 'A';
        const [empId] = await connection('empresas').insert({
            empCnpj,
            empRazSocial,
            empNomFantasia, 
            empInsEstadual, 
            empEndereco, 
            empNumero, 
            empComplemento, 
            empBairro, 
            empCidade, 
            empCep, 
            empUf, 
            empCodIbge, 
            empTelefone, 
            empContato, 
            empEmail,
            empStatus: status
        });
           
        return response.json({empId});
    },

    async searchEmp(request, response) {
        let cnpj = request.params.idCnpj;

        console.log('Procurando empresa com o Id:',cnpj);

        const empresa = await connection('empresas')
            .where('empCnpj', cnpj)
            .select('*')
            .first();
          
        if (!empresa) {
            return response.status(400).json({ error: 'Não encontrou empresa c/ este ID'});
        } 

        console.log(empresa)

        return response.json(empresa);
    },
};
