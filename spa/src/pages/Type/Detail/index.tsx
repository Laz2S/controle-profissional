import React, { useState, useEffect } from "react";
import {  FiArrowLeft } from 'react-icons/fi';
import Logo from '../../../assets/logo.png';
import { Container } from './styles';
import { useRouteMatch } from 'react-router-dom';
import { ProfessionalType } from "../../../services/interfaces";
import api from '../../../services/api';

interface CardParams {
  id: string;
}

const Detail: React.FC = () => {
  
  const [professionalType, setProfessionalType] = useState<ProfessionalType | null>(null);
  const [situacao, setSituacao] = useState('');
  const { params } = useRouteMatch<CardParams>();

  const load = async () => {
    await api
      .get('api/professionals-types/' + params.id)
      .then(({ data }) => {
        setProfessionalType(data)
      })
  }
  useEffect(() => {
    load()}, [params.id])

    return(
        <Container>
            <header>

                <span>Detalhes do Tipo de Profissional</span>

                <a href="/">
                <FiArrowLeft />
                    Voltar
                </a>
            </header>

        <div className="detail">

        <fieldset>
          <legend>
            <h2>Dados do Tipo de Profissional</h2>
          </legend>
          <label>Descrição:</label>
          <p>{ professionalType ? professionalType.descricao : null }</p>
          <label>situacao:</label>
          <p>{ professionalType ? professionalType.situacao : null }</p>
        </fieldset>
        
      </div>
        </Container>
            
    );
}

export default Detail;