import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';
import { Title, Image, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Image src={logoImage} alt="Github Explorer" />
      <Title>Dashboard</Title>

      <Form>
        <input type="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="test">
          <img
            src="https://avatars1.githubusercontent.com/u/62401570?s=460&u=73935f155f44c5c422e19b58c4bac6289d05956d&v=4"
            alt="Profile"
          />
          <div>
            <strong>ChristySchott/react-instagram</strong>
            <p>Repositório do clone do Instagram</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
