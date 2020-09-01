import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoImage from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  fullName: string;
  description: string;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  owner: {
    login: string;
    avatarUrl: string;
  };
}

interface Issue {
  id: number;
  title: string;
  htmlURL: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    });

    // async function loadData(): Promise<void> {
    //   const [repository, issues] = await Promise.all([
    //     api.get(`repos/${params.repository}`),
    //     api.get(`repos/${params.repository}/issues`),
    //   ]);
    // }

    // loadData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImage} alt="GitHub Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatarUrl}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.fullName}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazersCount}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forksCount}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.openIssuesCount}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.htmlURL}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
