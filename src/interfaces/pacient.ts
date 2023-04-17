export interface PacientInterface {
  // Pode ser um documento criptografado do paciente, por exemplo
  // Usamos essa propriedade para destinguir nomes iguais
  // (obrigatório)
  idExterno: string
  // Nome do paciente (obrigatório)
  nome: string
  // Nome social do paciente (opcional)
  nome_social?: string

  cpf: string
  // Endereço do paciente (opcional)
  endereco?: string
  // Cidade do paciente (opcional)
  cidade?: string
  // Telefone (obrigatório, DDD + digitos, somente números)
  telefone: string
  // Usado no receituário de alto custo (Opcional)
  peso?: number
  // Usado no receituário de alto custo (Opcional)
  altura?: number
  // Usado no receituário de alto custo (Opcional)
  nome_mae?: string
  // Usado no receituário de alto custo (Opcional)
  dificuldade_locomocao?: boolean
}
export interface WorkplaceInterface {
  city: string;
  state: string;
  local_name: string;
  address: string;
  phone: number;
}
export interface PrescriptionDataInterface {
  alterada: boolean;
  prescricao: {
    paciente: {
      id: number;
      external_id: string;
      category_condition_id: string | number | null;
      benefit_member_id: string | number | null;
      nome: string;
      nome_completo: string | null;
      nome_social: string | null;
      peso: string | number | null;
      altura: string | number | null;
      rg: string | number | null;
      cpf: string | null;
      data_nascimento: string | number | null;
      nome_mae: string | null;
      dificuldade_locomocao: boolean;
      nome_responsavel: string | null;
      email: string | null;
      telefone: string | number | null;
      cidade: string;
      endereco: string;
      accept_terms: number;
      total: number;
      type: string;
      _relationships: {
        allergy: [
          {
            id: number;
            patient_id: number;
            ingredient_id: number;
            created_at: string;
            deleted_at: string | null;
            type: string;
            ingredient_name: string;
            related: string;
          }
        ];
      };
      ultima: string;
      allergy: [
        {
          id: number;
          patient_id: number;
          ingredient_id: number;
          created_at: string;
          deleted_at: string | null;
          type: string;
          ingredient_name: string;
          related: string;
        }
      ];
    };
    pacienteId: string | null;
    screening: string;
    additionalData: {
      header: [
        {
          Registro: string;
          Paciente: string;
        },
        {
          Sexo: string;
          "Estado Civil": string;
          "Data de Nasc": string;
        },
        {
          Endereço: string;
        },
        {
          Profissional: string;
        }
      ];
      footer: string;
      numeroProntuario: string;
      atendimento: string;
      outraInformacao: string;
      establishment: {
        name: string;
        cnes: string;
      };
    };
    workplace: {
      city: string;
      state: string;
      cnes: string;
      local_name: string;
      address: string;
      phone: string;
    };
    prescriptionDate: string;
    prescriptionUuid: string;
    medicamentos: [
      {
        id: string;
        nome: string;
        descricao: string;
        posologia: string;
        quantidade: number;
        unit: string;
        formas_fisicas_unidades_id: number;
        composicao: string;
        fabricante: string;
        titularidade: string;
        controle_especial: boolean;
        alto_custo: boolean;
        quantidade_mes_1: number | string | null;
        quantidade_mes_2: number | string | null;
        quantidade_mes_3: number | string | null;
        quantidade_mes_4: number | string | null;
        quantidade_mes_5: number | string | null;
        quantidade_mes_6: number | string | null;
        anamnese: string;
        tratamento_previo: boolean;
        descricao_tratamento: string;
        data_solicitacao: string;
        cid_id: number;
        receituario: string;
        exames_sus_codigo: string;
        exames_tuss_codigo: string;
        tipo_exame_selecionado: string;
        catmat_codigo_br: string;
        catmat_descricao: string;
        cid_descricao: string;
        cid_numero: string;
        preco: number;
        real_id: number;
        tarja: string;
        tipo: string;
        exames: string[];
        fabricante_id: string;
        sanitized_posology: string;
        form_units: [
          {
            id: number;
            singular: string;
            plural: string;
            type: string;
          }
        ];
        psp: {
          active: boolean;
          tagline: string | null;
          link: string | null;
        };
        via: string | null;
        receituario_id: number;
        ean: string | null;
        descontinuado: boolean;
        status: string;
        origem: string;
        cid: string;
        mostrarDescricao: boolean;
        subtitulo: string;
        titulo: string;
      }
    ];
    reprint: boolean;
    prescriptionTimer: {
      hasStarted: boolean;
      startTime: number;
    };
    clinica: {
      id: number;
      nome: string;
      cnes: string | number | null;
      cnpj: string | number | null;
      endereco: string | null;
      type: string;
    };
    id: number;
    medicos_id: number;
    prescricao_editada_id: string | number | null;
    lme: boolean;
    opcoes_receituario_id: number;
    nome_medico: string;
    endereco_medico: string;
    cidade_medico: string;
    telefone_medico: string;
    checksum: string | number | null;
    created_at: string;
    source: string;
    signed: number;
    renew: number;
    data: string;
    horario: string;
    print_config: string;
    prescriptionDateOriginal: string;
    medicos: {
      id: string;
      especialidades_id: number;
      cidades_id: number;
      nome_completo: string;
      cns: string | number | null;
      crm: string;
      uf: string;
      estudante: number;
      telefone: string;
      type: string;
    };
    documents: [
      {
        id: number;
        uuid: string;
        type: string;
        status: string;
        prescription_id: number;
        prescription_uuid: string;
        prescription_origin: string | number | null;
        prescription_item_id: string | number | null;
        signed: number;
        signed_by: string;
        file_name: string;
        file_size: string;
        file_hash: string;
        keywords: {
          prescriptionUuid: string;
          uuid: string;
          date: string;
        };
        created_at: string;
        updated_at: string;
        deleted_at: null;
      }
    ];
  };
  reimpressao: boolean;
}
