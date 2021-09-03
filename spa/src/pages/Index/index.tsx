import React, { useState, useEffect  } from "react";
import { FiArchive, FiEdit, FiTrash2 } from 'react-icons/fi';
import Logo from '../../assets/logo.png';
import { Container } from './styles';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { Professional } from "../../services/interfaces";

const Index: React.FC = () => {
    const history = useHistory();
    const [data, setData] = useState<Professional[]>([]);

    const load = async () => {
        await api
          .get('api/professionals')
          .then(({ data }) => {
            setData(data.docs)
          })
    }
    useEffect(() => {
      load()}, [])

      const handleDetail = async (codigo: String) => {
        history.push('/detail/' + codigo)
      }

      const handleEdit = async (codigo: String) => {
        history.push('/edit/' + codigo)
      }
  
      const handleDelete = async (codigo: String) => {
          try {
              await api.delete(`api/professionals/${codigo}`)
  
              alert('Cadastro deletado com sucesso.')
              load()
  
          } catch (err) {
              alert('Erro ao deletar registro.')
          }
      }
  
      return(
        <Container>
            <header>
                <a href="/type/new">Cadastrar Tipos de Profissionais</a>
                <a href="/new">Cadastrar Profissionais</a>
            </header>

            <h1>Profissionais Cadastrados</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Situacao</th>
                            <th>Tipo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0
                            ? data.map((o) => {
                                return (
                                    <tr key={o.id}>
                                        <td>{o.nome}</td>
                                        <td>{o.telefone}</td>
                                        <td>{o.situacao ? "Ativo" : "Inativo"}</td>
                                        <td>{o.professional_type?.descricao}</td>
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