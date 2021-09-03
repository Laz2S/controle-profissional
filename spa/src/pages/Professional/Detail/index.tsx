import React, { useState, useEffect } from "react";
import {  FiArrowLeft } from 'react-icons/fi';
import Logo from '../../../assets/logo.png';
import { Container } from './styles';
import { useRouteMatch } from 'react-router-dom';
import { ProfessionalType, Professional } from "../../../services/interfaces";
import api from '../../../services/api';

interface CardParams {
  id: string;
}

const Detail: React.FC = () => {
  
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [professionalType, setProfessionalType] = useState<ProfessionalType[]>([]);
  const [situacao, setSituacao] = useState('');
  const { params } = useRouteMatch<CardParams>();

  const load = async () => {
    await api
      .get('api/professionals-types')
      .then(({ data }) => {
        setProfessionalType(data.docs)
      })
    await api
      .get('api/professionals/' + params.id)
      .then(({ data }) => {
        setProfessional(data)
        console.log(data)
      })
  }
  useEffect(() => {
    load()}, [params.id])

    return(
        <Container>
            <header>

                <span>Detalhes do Profissional</span>

                <a href="/">
                <FiArrowLeft />
                    Voltar
                </a>
            </header>

        <div className="detail">

        <fieldset>
          <legend>
            <h2>Dados do Profissional</h2>
          </legend>
          <label>Nome:</label>
          <p>{ professional ? professional.nome : null }</p>
          <label>Telefone:</label>
          <p>{ professional ? professional.telefone : null }</p>
          <label>Email:</label>
          <p>{ professional ? professional.email : null }</p>
          <label>Situação:</label>
          <p>{ professional ? (professional.situacao ? "Ativo" : "Inativo") : null }</p>
          <label>Tipo do Profissional:</label>
          <p>{ professional ? professional.professional_type?.descricao : null }</p>
        </fieldset>
        
      </div>
        </Container>
            
    );
}

export default Detail;