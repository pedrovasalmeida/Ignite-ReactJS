import { useState, useEffect } from 'react';
import { RepositoryItem } from './RepositoryItem';

import '../styles/repositories.scss';

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

interface PinnedRepo {
  repo: string;
  description: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [pinnedRepos, setPinnedRepos] = useState<PinnedRepo[]>([]);
  const [finalRepositories, setFinalRepositories] = useState<Repository[]>([]);

  const getPinnedRepoLink = () => {
    let newPinnedRepos = [];

    for (let i = 0; i < repositories.length; i++) {
      for (let j = 0; j < pinnedRepos.length; j++) {
        if (pinnedRepos[j].repo === repositories[i].name) {
          newPinnedRepos.push({
            ...repositories[i],
          });
        }
      }
    }

    setFinalRepositories(newPinnedRepos);
  };

  useEffect(() => {
    fetch('https://api.github.com/users/pedrovasalmeida/repos')
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  useEffect(() => {
    fetch('https://gh-pinned-repos.now.sh/?username=pedrovasalmeida')
      .then((response) => response.json())
      .then((data) => setPinnedRepos(data));
  }, []);

  useEffect(() => {
    getPinnedRepoLink();
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios em destaque</h1>

      <ul>
        {finalRepositories.map((item) => (
          <RepositoryItem key={item.name} repository={item} />
        ))}
      </ul>
    </section>
  );
}
