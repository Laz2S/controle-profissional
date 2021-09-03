import React, { useState, useEffect, ChangeEvent } from "react";
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../../assets/logo.png';
import Button from "../../../components/Button";
import Input from '../../../components/Input'
import Index from '../Index/index'
import { Container } from './styles';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { ProfessionalType } from "../../../services/interfaces";
import api from '../../../services/api';

interface CardParams {
  id: string;
}

const Edit: React.FC = () => {
 
  const history = useHistory();
  const [professionalType, setProfessionalType] = useState<ProfessionalType>();
  const [selectedSituacao, setSelectedSituacao] = useState('');
  const [situacao, setSituacao] = useState('');
  const { params } = useRouteMatch<CardParams>();

  function handleSelectSituacao(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedSituacao(res);
  };

  const load = async () => {
    await api
      .get('api/professionals-types/' + params.id)
      .then(({ data }) => {
        setProfessionalType(data)
        setSelectedSituacao(data.situacao ? "1" : "0")
      })
      
  }
  useEffect(() => {
    load()}, [params.id])

    async function handleSubmit(data: ProfessionalType) {
      try {
        const schema = Yup.object().shape({
          descricao: Yup.string().required('Descrição obrigatório'),
        });

        await schema.validate(data, {
            abortEarly: false
        });

        let body = {
          descricao: data.descricao,
          situacao: selectedSituacao
        }
        
        try {
            await api({
                method: 'put',
                url: 'api/professionals-types/' + params.id,
                data: body,
                headers: {'Content-Type': 'application/json' }
                })

            alert('Edição efetuado com sucesso.')

            history.push('/type/new')
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

              <span>Edição do Tipo de Profissional</span>

              <a href="/">
              <FiArrowLeft />
                  Voltar
              </a>
          </header>

      <Form onSubmit={handleSubmit}>
      
      <fieldset>
        <legend>
          <h2>Dados do Tipo de Profissional</h2>
        </legend>

        <Input name="descricao" defaultValue={professionalType?.descricao} type="text" placeholder="Descrição" />

        <select
          value={selectedSituacao}
          onChange={handleSelectSituacao}
        >
          <option>Selecione a Situação</option>
            <option key="0" value="0">Inativo</option>
            <option key="1" value="1">Ativo</option>
        </select>
         
      </fieldset>
      <Button type="submit">
        Editar
      </Button>
    </Form>
      <Index/>
      </Container>
          
  );
}

export default Edit;