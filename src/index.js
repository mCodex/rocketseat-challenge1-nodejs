import express from 'express';
import helmet from 'helmet';

const server = express();

server.use(express.json());
server.use(helmet());

let projects = [];
let globalCounter = 0;

const checkIfProjectAlreadyExists = (req, res, next) => {
  const { id: projectId } = req.params;

  const projectExists = projects.some((p) => p.id === +projectId);

  if (projectExists) {
    return next();
  }

  return res
    .status(400)
    .send({ message: 'Error, the given project does not exist.' });
};

const apiAnalytics = (req, res, next) => {
  globalCounter += 1;
  console.log(globalCounter);
  return next();
};

server.get('/projects', apiAnalytics, (req, res) => res.send(projects));

server.post('/project', apiAnalytics, (req, res) => {
  projects.push(req.body);
  return res.send(projects);
});

server.post('/projects/:id/tasks', checkIfProjectAlreadyExists, apiAnalytics, (req, res) => {
  const { id: projectId } = req.params;
  const { title } = req.body;

  projects = projects.map((project) => {
    if (project.id !== +projectId) {
      return project;
    }
    const tasks = project.tasks || [];

    tasks.push(title);

    project.tasks = tasks;

    return project;
  });

  return res.send(projects);
});

server.delete('/project/:id', checkIfProjectAlreadyExists, apiAnalytics, (req, res) => {
  const { id } = req.params;

  const filteredProjects = projects.filter((p) => p.id !== +id);

  projects = filteredProjects;

  return res.send(projects);
});

server.put('/project/:id', checkIfProjectAlreadyExists, apiAnalytics, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const idToNumber = +id;

  const updatedProjects = projects.map((p) => {
    if (p.id === idToNumber) {
      p.title = title;
    }
    return p;
  });

  projects = updatedProjects;

  return res.send(projects);
});


server.listen(4000);
