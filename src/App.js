import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [projects, setProjects] = useState([])

  useEffect(() => {

    api.get('http://localhost:3333/repositories').then(response => {

      setProjects(response.data)

    })

  }, [])


  async function handleAddRepository() {


    const response = await api.post('repositories', {
      title: 'title',
      techs: 'tech',
      url: 'url',
    })

    const project = response.data

    setProjects([...projects, project])


  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

    const project = projects.filter(project => project.id !== id)

    setProjects(project)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
