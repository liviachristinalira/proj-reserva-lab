# proj-reserva-lab
Sistema completo (API e Front-end) para reserva de laboratórios, utilizando Node.js e Express no back-end, React no front-end, e Terraform e Docker na infraestrutura.

## 📖 Sobre o Projeto
Este projeto foi desenvolvido para o gerenciamento de disponibilidade e reservas de ambientes físicos, com foco em laboratórios (ex: Lab 04, Lab 05, Lab 06). O sistema permite verificar a disponibilidade de salas e registrar agendamentos, mantendo um histórico de quem utilizou o ambiente, os horários e o propósito.

Recentemente, o projeto evoluiu de uma API estritamente back-end para uma **solução Full-Stack**, incluindo uma interface gráfica amigável e regras rígidas de segurança para ambientes corporativos/acadêmicos.

---

## 🚀 Tecnologias Utilizadas

**Back-end:**
* Node.js & Express
* PostgreSQL (Banco de Dados)
* `bcrypt` (Criptografia e segurança de senhas)

**Front-end:**
* React (Vite)
* Componentização funcional (Hooks: `useState`, `useEffect`)

**Infraestrutura:**
* Docker & Terraform

---

## ⚙️ Funcionalidades e Regras de Negócio

* 🔒 **Autenticação Segura:** Sistema de login validado via API com senhas protegidas por hash (`bcrypt`). O front-end mantém a sessão do usuário ativa utilizando o `localStorage`.
* 🏢 **Arquitetura de Sistema Interno (B2B):** Por questões de segurança, a interface pública de cadastro de novos usuários foi removida. O sistema é restrito para uso interno, onde apenas administradores podem criar novas contas (via API/Insomnia).
* 🔍 **Filtros e Buscas:** Listagem de laboratórios com barra de pesquisa dinâmica em tempo real (Query Params no back-end e reatividade no front-end).
* 📅 **Prevenção de Conflitos:** Bloqueio inteligente (HTTP 409 Conflict) caso um usuário tente reservar um laboratório em um horário que já está ocupado.
* ❌ **Cancelamento Inteligente:** Possibilidade de cancelar reservas diretamente pela interface. O sistema utiliza o método `PATCH` para atualizar o status da reserva no banco (mantendo o histórico) em vez de excluí-la definitivamente.
* 🧩 **Componentização:** Front-end arquitetado em componentes independentes (`ListaLaboratorios`, `ListaReservas`, `NovaReserva`, `LoginUsuario`), garantindo código limpo e fácil manutenção.

---

## 🗄️ Modelagem de Dados

Com base nos requisitos estabelecidos, o sistema é composto pelas seguintes entidades principais e seus relacionamentos:

* **Usuário (`usuario_id`)**: A pessoa que está realizando a reserva (conta gerada pelo administrador).
* **Ambiente / Laboratório (`ambiente_id`)**: O local físico a ser reservado, contendo informações como capacidade máxima.
* **Reserva (`reserva_id`)**: O registro do agendamento que vincula um usuário a um ambiente. Possui controle de status (ex: "confirmada", "cancelada") e horários exatos de início e fim.