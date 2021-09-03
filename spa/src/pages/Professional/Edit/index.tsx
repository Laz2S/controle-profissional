import React, { useState, useEffect, ChangeEvent } from "react";
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../../assets/logo.png';
import Button from "../../../components/Button";
import Input from '../../../components/Input'
import { Container } from './styles';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { ProfessionalType, Professional } from "../../../services/interfaces";
import api from '../../../services/api';

interface CardParams {
  id: string;
}

const Edit: React.FC = () => {
 
  const history = useHistory();
  const [professional, setProfessional] = useState<Professional>();
  const [selectedProfessionalType, setSelectedProfessionalType] = useState('');
  const [selectedSituacao, setSelectedSituacao] = useState('');
  const [professionalType, setProfessionalType] = useState<ProfessionalType[]>([]);
  const [situacao, setSituacao] = useState('');
  const { params } = useRouteMatch<CardParams>();
  

  function handleSelectProfessionalType(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedProfessionalType(res);
  };

  function handleSelectSituacao(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedSituacao(res);
  };

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
        setSelectedProfessionalType(data.professional_type.id)
        setSelectedSituacao(data.situacao ? "1" : "0")
      })
      
  }
  useEffect(() => {
    load()}, [params.id])

    async function handleSubmit(data: Professional) {
      try {
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
            abortEarly: false
        });

        let body = {
          professional_type: selectedProfessionalType,
          nome: data.nome,
          telefone: data.telefone,
          email: data.email,
          situacao: selectedSituacao
        }
        
        try {
            await api({
                method: 'put',
                url: 'api/professionals/' + params.id,
                data: body,
                headers: {'Content-Type': 'application/json' }
                })

            alert('Edição efetuado com sucesso.')

            history.push('/')
        } catch (err) {
            alert('Erro ao cadastrar seus dados.')
        }
    } catch ( error ) {
        console.log(error)
    }
  }

  return(
      <Container>
          <header>

              <span>Edição do Profissional</span>

              <a href="/">
              <FiArrowLeft />
                  Voltar
              </a>
          </header>

      <Form onSubmit={handleSubmit}>
      
      <fieldset>
        <legend>
          <h2>Dados do Profissional</h2>
        </legend>

        <Input name="nome" defaultValue={professional?.nome} type="text" placeholder="Nome" />
        <Input name="telefone" defaultValue={professional?.telefone} type="tel" placeholder="Telefone" />
        <Input name="email" defaultValue={professional?.email} type="mail" placeholder="Email" />

        <select
          value={selectedSituacao}
          onChange={handleSelectSituacao}
        >
          <option>Selecione a Situação</option>
            <option key="0" value="0">Inativo</option>
            <option key="1" value="1">Ativo</option>
        </select>

        <select
          value={selectedProfessionalType}
          onChange={handleSelectProfessionalType}
        >

        {
          professionalType.length > 0
          ? professionalType.map((o) => {
              return (
                <option key={o.id} value={o.id}>{o.descricao}</option>
              )
            })
          : <option>Nenhum Tipo de Profissional encontrado</option>
        }
        </select>
         
      </fieldset>
      <Button type="submit">
        Editar
      </Button>
    </Form>
      </Container>
          
  );
}

export default Edit;