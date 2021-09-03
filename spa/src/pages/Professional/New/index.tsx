import React, { useState, useEffect, ChangeEvent } from "react";
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../../assets/logo.png';
import Button from "../../../components/Button";
import Input from '../../../components/Input'
import { Container } from './styles';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { ProfessionalType, Professional } from "../../../services/interfaces";
import api from '../../../services/api';

const New: React.FC = () => {

  const history = useHistory();
  
  const [selectedSituacao, setSelectedSituacao] = useState('');
  const [situacao, setSituacao] = useState('');
  const [selectedProfessionalType, setSelectedProfessionalType] = useState('');
  const [ProfessionalType, setProfessionalType] = useState<ProfessionalType[]>([]);

  const load = async () => {
    await api
      .get('api/professionals-types')
      .then(({ data }) => {
        setProfessionalType(data.docs)
      })
  }
  useEffect(() => {
    load()}, [])

  function handleSelectProfessionalType(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedProfessionalType(res);
  };

  function handleSelectSituacao(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedSituacao(res);
  };

  async function handleSubmit(data: Professional) {
      try {
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
            abortEarly: false
        });

        if (!selectedProfessionalType) {
          throw new Error("Tipo de Profissional é um campo obrigatório");
        }

        let body = {
          professional_type: selectedProfessionalType,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          situacao: selectedSituacao
        }
        
        try {
            await api({
                method: 'post',
                url: 'api/professionals',
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

                <span>Cadastro de Profissionais</span>

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

          <Input name="nome" type="text" placeholder="Nome" />
          <Input name="telefone" type="tel" placeholder="Telefone" />
          <Input name="email" type="mail" placeholder="Email" />

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
            <option>Selecione o Medico</option>
          {
            ProfessionalType.length > 0
            ? ProfessionalType.map((o) => {
                return (
                <option key={o.id} value={o.id}>{o.descricao}</option>
                )
              })
            : <option>Nenhum Tipo de Profissional encontrado</option>
          }
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