import React, { useState, useEffect, ChangeEvent } from "react";
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../../assets/logo.png';
import Button from "../../../components/Button";
import Input from '../../../components/Input'
import { Container } from './styles';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { ProfessionalType } from "../../../services/interfaces";
import api from '../../../services/api';

const New: React.FC = () => {

  const history = useHistory();
  
  const [selectedSituacao, setSelectedSituacao] = useState('');
  const [situacao, setSituacao] = useState('');
  const [ProfessionalType, setProfessionalType] = useState<ProfessionalType[]>([]);

  const load = async () => {
  }
  useEffect(() => {
    load()}, [])

  function handleSelectSituacao(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedSituacao(res);
  };

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
                method: 'post',
                url: 'api/professionals-types',
                data: body,
                headers: {'Content-Type': 'application/json' }
                })

            alert('Cadastro efetuado com sucesso.')

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

                <span>Cadastro de Tipos de Profissionais</span>

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

          <Input name="descricao" type="text" placeholder="Descrição" />

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
          Cadastrar
        </Button>
      </Form>
        </Container>
            
    );
}

export default New;