const { Console } = require('console');
const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        const emitentes = await connection('nfeEmitentes')
        .orderBy('emiRazSocial')
        .select('*');
    
        return response.json(emitentes);
    },    
        
    async create(request, response) {
        const {emiCnpj, emiRazSocial, emiNomFantasia, emiInsEstadual, emiEndereco, emiNumero, emiComplemento, emiBairro, emiCidade, emiCep, emiUf, emiCodIbge, emiTelefone, emiContato, emiEmail} = request.body;
        let status = 'A';
        const [emiId] = await connection('nfeEmitentes').insert({
            emiCnpj,
            emiRazSocial,
            emiNomFantasia, 
            emiInsEstadual, 
            emiEndereco, 
            emiNumero, 
            emiComplemento, 
            emiBairro, 
            emiCidade, 
            emiCep, 
            emiUf, 
            emiCodIbge, 
            emiTelefone, 
            emiContato, 
            emiEmail,
            emiStatus: status
        });
           
        return response.json({emiId});
    },

    async searchEmi(request, response) {
        let cnpj = request.params.idCnpj;

        console.log('Procurando empresa com o Id:',cnpj);

        const empresa = await connection('nfeEmitentes')
            .where('emiCnpj', cnpj)
            .select('*')
            .first();
          
        if (!empresa) {
            return response.status(400).json({ error: 'Não encontrou empresa c/ este ID'});
        } 

        console.log(empresa)

        return response.json(empresa);
    },
};
