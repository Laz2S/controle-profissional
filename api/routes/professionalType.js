const router = require('express-promise-router')();
const professionalTypeController = require('../controllers/professionalTypeController');

// ==> Definindo as rotas do CRUD - 'Professional':

// ==> Rota responsável por criar um novo 'Professional': (POST): localhost:3000/api/professionals
router.post('/professionals-types', professionalTypeController.createProfessional);
router.get('/professionals-types', professionalTypeController.listAllProfessionals);
router.get('/professionals-types/:id', professionalTypeController.findProfessionalById);
router.put('/professionals-types/:id', professionalTypeController.updateProfessionalById);
router.delete('/professionals-types/:id', professionalTypeController.deleteProfessionalById);

module.exports = router;