const router = require('express-promise-router')();
const professionalController = require('../controllers/professionalController');

// ==> Definindo as rotas do CRUD - 'Professional':

// ==> Rota responsável por criar um novo 'Professional': (POST): localhost:3000/api/professionals
router.post('/professionals', professionalController.createProfessional);
router.get('/professionals', professionalController.listAllProfessionals);
router.get('/professionals/:id', professionalController.findProfessionalById);
router.put('/professionals/:id', professionalController.updateProfessionalById);
router.delete('/professionals/:id', professionalController.deleteProfessionalById);

module.exports = router;