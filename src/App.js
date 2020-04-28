import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

import logoImage from './assets/logo.png';

function App() {
const [repositories, setRepositories] = useState([]);

useEffect(() => {
  api.get('repositories').then(response => {
    setRepositories(response.data);
  })
}, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'teste',
      url: 'https://github.com/rocketseat/umbriel',
      techs: ['Node.js', 'ReactJS']
    })

    setRepositories([ ...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div className="content">
      <div className="header">
        <img src={logoImage} alt="Logo" />
        <h1>repo</h1>
      </div>
      <button className="btn-add" onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
          {repositories.map(repository =>
            <li key={repository.id} className="repository">
              <h3>{repository.title}</h3>
              <span className="url">{repository.url}</span>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )}
      </ul>  
    </div>
  );
}

export default App;
