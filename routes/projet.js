const express = require('express');
const router = express.Router();
const projetCtrl = require('../controllers/projet');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, projetCtrl.createProject);
router.put('/:id', auth, multer, projetCtrl.modifyProject);
router.delete('/:id', auth, projetCtrl.deleteProject);
router.get('/', auth, projetCtrl.getAllProjet);
router.get('/:id', auth, projetCtrl.getOneProject);



module.exports = router;