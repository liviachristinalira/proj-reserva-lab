# proj-reserva-lab
API de reserva de laboratórios com Node.js e Express no back e Terrform e Docker na infra.

## 📖 Sobre o Projeto
Este projeto é uma API desenvolvida para o gerenciamento de disponibilidade e reservas de ambientes físicos, com foco em laboratórios (ex: Lab 04, Lab 05, Lab 06). O sistema permite verificar a disponibilidade de salas e registrar agendamentos, mantendo um histórico de quem utilizou o ambiente, os horários e o propósito.

## ⚙️ Funcionalidades e Modelagem

Com base nos requisitos estabelecidos, o sistema é composto pelas seguintes entidades principais e seus relacionamentos:
* **Usuário (`usuario_id`)**: A pessoa que está realizando a reserva.
* **Ambiente (`ambiente_id`)**: O local físico a ser reservado (ex: Labs).
* **Reserva (`reserva_id`)**: O registro do agendamento que vincula um usuário a um ambiente.
