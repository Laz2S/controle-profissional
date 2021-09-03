export interface Professional {
    id: string;
    nome: string;
    telefone: string;
    email: string;
    situacao: boolean;
    updatedAt: string;
    createdAt: string;
    professional_type: {
        id: string;
        descricao: string;
        situacao: boolean;
        updatedAt: string;
        createdAt: string;
    };
}

export interface ProfessionalType {
    id: string;
    descricao: string;
    situacao: boolean;
    updatedAt: string;
    createdAt: string;
}