import express from 'express';
import helmet from 'helmet';

const server = express();

server.use(express.json());
server.use(helmet());

let projects = [];

server.get('/projects', (req, res) => res.send(projects));

server.post('/project', (req, res) => {
  projects.push(req.body);
  return res.send(projects);
});

server.delete('/project/:id', (req, res) => {
  const { id } = req.params;

  const filteredProjects = projects.filter((p) => p.id !== +id);

  projects = filteredProjects;

  return res.send(projects);
});

server.put('/project/:id', (req, res) => {
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
