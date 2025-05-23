import { response } from "express";
import swaggerJSDoc from "swagger-jsdoc";


const swaggerDefinition = {
    openapi: '3.0.4',
    info: {
        title: 'API do Gestor Financeiro Pessoal',
        version: '1.0.0',
        description: `API para gerenciamento financeiro pessoal desenvolvida no curso Técnico de Desenvolvimento de Sistemas do SENAI`
    },
    servers: [
        {
            url: 'http://localhost:3000/',
            description: 'Servidor Local'
        },
        {
            url: 'http://192.168.0.237:3000/',
            description: 'Servidor de API do Douglas'
        }
    ],
    tags: [
        {
            name: 'Usuarios',
            description: 'Rotas para cadastro, login, atualização e desativação de usuários'
        },
        {
            name: 'Categorias',
            description: 'Rotas para cadastro, leitura, atualização e desativação de categorias'
        },
        {
            name: 'subCategorias',
            description: 'Rotas para cadastro, leitura, atualização e desativação de subcategorias'
        }
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    paths: {
        '/usuarios': {
            post: {
                tags: ['Usuarios'],
                summary: 'Cadastrar novo usuario',
                description: 'Método utilizado para cadastrar novos usuários',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'email', 'senha', 'tipo_acesso'],
                                properties: {
                                    nome: { type: 'string', example: 'João Silva' },
                                    email: { type: 'string', example: 'joao@example.com' },
                                    senha: { type: 'string', example: '123' },
                                    tipo_acesso: { type: 'string', example: 'adm' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Usuário cadastrado com sucesso'
                    },
                    '400': {
                        description: 'Erro ao cadastrar usuário'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
            patch:{
                tags:['Usuarios'],
                summary: "Atualizar os usuarios",
                description: 'Metodo utilizado para atualizar os usuarios por',
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    '200': {
                        description: 'usuario atualizado com sucesso',
                        content: {
                            'application/json':{
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            nome: {type: 'string', exemple: 'helo'},
                                            senha:{type: 'string', exemple: "1234"},
                                            tipo_acesso: {type: 'string', exemple:'admin'}, 
                                        }
                                    }
                                }
                            }
                        },
                        '500':{
                            description: 'Erro interno do servidor'
                        }
                    }
                }
            },
            get: {
                tags: ['Usuarios'],
                summary: 'Listar todos os usuários',
                description: 'Método utilizado para listar todos os usuários cadastrados',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    '200': {
                        description: 'Lista de usuários',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id_usuario: { type: 'integer', example: 1 },
                                            nome: { type: 'string', example: 'João Silva' },
                                            email: { type: 'string', example: 'joao@example.com' },
                                            senha: { type: 'string', example: '123' },
                                            tipo_acesso: { type: 'string', example: 'adm' },
                                            ativo: { type: 'boolean', example: true },
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
            '/usuarios/{id_usuario}': {
                delete: {
                tags: ['Usuarios'],
                summary: 'desativar usuario',
                description: 'rota para desativar o usuario',
                security: [
                    {
                        bearerAuth: [],
                    }
                ],
                parameters: [
                    {
                        name: 'id_usuario',
                        in: 'path', // caso queira passar como query in: 'query'
                        required: true,
                        schema: {
                            type: 'integer'
                        }   
                    }
                ],
                responses: {
                    '200': { description: 'Usuario desativado com sucesso!'},
                    '500': { description: 'Erro ao desativar usuario'}
                }
             }
            },

        '/usuarios/login': {
            post: {
                tags: ['Usuarios'],
                summary: 'Login do usuário',
                description: 'Método utilizado para efetuar o login do usuário e gerar o token',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'senha'],
                                properties: {
                                    email: { type: 'string', example: 'sesia@sesi.br' },
                                    senha: { type: 'string', example: '123' },
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Usuário encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            token: { type: 'string', example: 'jkdnaskjdbaskjndlaksnmmlmcaj21lekn1lkn213n12jb3kj 21' },
                                            id_usuario: { type: 'integer', example: 1 },
                                            nome: { type: 'string', example: 'João Silva' },
                                            email: { type: 'string', example: 'joao@example.com' },
                                            senha: { type: 'string', example: '123' },
                                            tipo_acesso: { type: 'string', example: 'adm' },
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Erro ao encontrar usuário'
                    },
                    '500': {
                        description: 'Erro interno do servidor'
                    }
                }
            },
        },
        '/categorias': {
            post: {
                tags:['Categorias'],
                summary: 'nova Categoria',
                description: 'Rota para cadastrar uma nova categoria',
                security:[
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    require: true,
                    content: {
                        'application/json' :{
                            schema: {
                                type:'object', 
                                required: ['nome', 'tipo_transacao', 'gasto_fixo', 'id_usuario'],
                                properties: {
                                    nome: {type: "string", exemple: 'Alimentção'},
                                    tipo_transacao: {type: 'string', exemple: 'ENTRADA OU SAIDA'},
                                    gasto_fixo: {type: 'boolean', exemple: true },
                                    id_usuario: {type: 'integer', exemple: 1},
                                    cor: {type: 'string', exemple: '#fff'},
                                    icone: {type: 'string', exemple: 'save'}
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200':{
                        description: 'Categoria cadastrada'
                    },
                    '400':{
                        description: 'Erro ao cadastrar categoria'
                    },
                    '500':{
                        description: 'Erro interno do servidor'
                    }
                }
            }
        },
        '/subCategorias':{
            post: {
                tags:['subCategorias'],
                summary: 'nova subCategoria',
                description: 'Rota para cadastrar uma nova subCategoria',
                requestBody: {
                    require: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required:['nome', 'id_categoria','gasto_fixo', 'ativo', 'cor', 'icone'],
                                properties:{
                                    nome: {type: "string", exemple: 'Alimentção'},
                                    id_categoria: {type: 'string', exemple: 1},
                                    gasto_fixo: {type: 'boolean', exemple: true },
                                    ativo: {type: 'boolean', exemple: true },
                                    cor: {type: 'string', exemple: '#fff'},
                                    icone: {type: 'string', exemple: 'save'}
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200':{
                        description: 'subCategoria cadastrada'
                    },
                    '400':{
                        description: 'Erro ao cadastrar subcategoria'
                    },
                    '500':{
                        description: 'Erro interno do servidor'
                    }
                }
            },
            get: {
                tags: ['subCategorias'],
                summary: 'Listar todos as subCategorias',
                description: 'Metodo utilizado para listar todas as subCategorias',
                responses: {
                    '200': {
                        description: 'Lista de subCategorias',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type:'object',
                                        properties: {
                                            nome: {type: "string", exemple: 'Alimentção'},
                                            id_categoria: {type: 'string', exemple: 1},
                                            gasto_fixo: {type: 'boolean', exemple: true },
                                            ativo: {type: 'boolean', exemple: true },
                                            cor: {type: 'string', exemple: '#fff'},
                                            icone: {type: 'string', exemple: 'save'}
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500':{
                        description: 'erro interno do servidor'
                    }
                }
            }
        },
        '/subCategorias/{id_subcategoria}':{
            delete: {
                tags:['subCategorias'],
                summary: 'desativar subcategoria',
                description:'rota para desativar a subCategoria',
                parameters: [
                    {
                        name:'id_subcategoria',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': { description: 'subcategoria desativada com sucesso!'},
                    '500': { description: 'Erro ao desativar subcategoria'}
                }
            }
        }
    }
}


const options ={
    swaggerDefinition,
    apis: [] //
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec
