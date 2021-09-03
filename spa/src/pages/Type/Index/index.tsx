import React, { useState, useEffect  } from "react";
import { FiArchive, FiEdit, FiTrash2 } from 'react-icons/fi';
import Logo from '../../../assets/logo.png';
import { Container } from './styles';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';
import { ProfessionalType } from "../../../services/interfaces";

const Index: React.FC = () => {
    const history = useHistory();
    const [data, setData] = useState<ProfessionalType[]>([]);

    const load = async () => {
        await api
          .get('api/professionals-types')
          .then(({ data }) => {
            setData(data.docs)
          })
    }
    useEffect(() => {
      load()}, [])

      const handleDetail = async (codigo: String) => {
        history.push('/type/detail/' + codigo)
      }

      const handleEdit = async (codigo: String) => {
        history.push('/type/edit/' + codigo)
      }
  
      const handleDelete = async (codigo: String) => {
          try {
              await api.delete(`api/professionals-types/${codigo}`)
  
              alert('Cadastro deletado com sucesso.')
              load()
  
          } catch (err) {
              alert('Erro ao deletar registro.')
          }
      }
  
      return(
        <Container>
            <h1>Tipos de Profissionais Cadastrados</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Situacao</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0
                            ? data.map((o) => {
                                return (
                                    <tr key={o.id}>
                                        <td>{o.descricao}</td>
                                        <td>{o.situacao ? "Ativo" : "Inativo"}</td>
                                        <td>
                                            <button className="actionDetailBtn" onClick={() => { handleDetail(o.id) }}>
                                                <FiArchive size={18} color="#FFF" />  
                                            </button>
                                            <button className="actionEditBtn" onClick={() => { handleEdit(o.id) }}>
                                                <FiEdit size={18} color="#FFF" />  
                                            </button>
                                            <button className="actionDelBtn" onClick={() => { handleDelete(o.id) }}>
                                                <FiTrash2 size={18} color="#FFF" />  
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                            : <tr/>
                        }
                    </tbody>
                     
                </table>
            </div>
        </Container>
            
    );
}

export default Index;