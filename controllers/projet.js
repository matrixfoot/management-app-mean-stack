const Project = require('../models/project');
const fs = require('fs');
exports.createProject = (req, res, next) => {
    const projectObject = JSON.parse(req.body.project);
    
    const project = new Project({
      ...projectObject,
      ficheUrl: `${req.file.url}`
    });
    project.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneProject = (req, res, next) => {
  Project.findOne({
    _id: req.params.id
  }).then(
    (project) => {
      res.status(200).json(project);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyProject = (req, res, next) => {
    const projectObject = req.file ?
      {
        ...JSON.parse(req.body.project),
        ficheUrl: `${req.file.url}`
      } : { ...req.body };
    Project.updateOne({ _id: req.params.id }, { ...projectObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.deleteProject = (req, res, next) => {
    Project.findOne({ _id: req.params.id })
      .then(project => {
        const filename = project.ficheUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Project.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getAllProjet = (req, res, next) => {
  Project.find().then(
    (projects) => {
      res.status(200).json(projects);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};