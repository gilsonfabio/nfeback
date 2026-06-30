const { Console } = require('console');
const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        const destinatarios = await connection('nfeDestinatarios')
        .orderBy('desRazSocial')
        .select('*');
    
        return response.json(destinatarios);
    },    
        
    async create(request, response) {
        const {desCnpjCpf, desRazSocial, desNomFantasia, desInsEstadual, desEndereco, desNumero, desComplemento, desBairro, desCidade, desCep, desUf, desCodIbge, desTelefone, desContato, desEmail} = request.body;
        let status = 'A';
        const [desId] = await connection('nfeDestinatarios').insert({
            desCnpj,
            desRazSocial,
            desNomFantasia, 
            desInsEstadual, 
            desEndereco, 
            desNumero, 
            desComplemento, 
            desBairro, 
            desCidade, 
            desCep, 
            desUf, 
            desCodIbge, 
            desTelefone, 
            desContato, 
            desEmail,
            desStatus: status
        });
           
        return response.json({desId});
    },

    async searchDes(request, response) {
        let cnpj = request.params.idCnpj;

        console.log('Procurando empresa com o Id:',cnpj);

        const destino = await connection('nfeDestinatarios')
            .where('desCnpjCpf', cnpj)
            .select('*')
            .first();
          
        if (!destino) {
            return response.status(400).json({ error: 'Não encontrou empresa c/ este ID'});
        } 

        console.log(destino)

        return response.json(destino);
    },
     
    async searchDesNome(request, response) {
        let razao = request.params.razao;

        console.log('Procurando empresa:', razao);

        const destino = await connection('nfeDestinatarios')
            .where('desRazSocial', 'like', `%${razao}%`)
            .select('*');

        if (!destino || destino.length === 0) {
            return response.status(400).json({ error: 'Não encontrou empresa' });
        }

        console.log(destino)

        return response.json(destino);
    },
     
};
