# Dockerfile
# Base a imagem oficial do Postgres (versão 16, alpine = mais leve)
FROM postgres:16-alpine

# Variáveis de ambiente padrão (podem ser sobrescritas pelo Terraform/docker run)
ENV POSTGRES_DB=lab_reserva
ENV POSTGRES_USER=lab_admin
ENV POSTGRES_PASSWORD=memuda

# O Postgres executa automaticamente, na primeira inicialização do container,
# todo script .sql ou .sh que estiver dentro de /docker-entrypoint-initdb.d
# Por isso o script de criação de tabelas é copiado para lá.
COPY db/init.sql /docker-entrypoint-initdb.d/init.sql

EXPOSE 5432
