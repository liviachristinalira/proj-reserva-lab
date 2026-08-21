# main.tf
# Provider "kreuzwerker/docker": permite ao Terraform gerenciar
# recursos Docker (imagens, containers, volumes, redes) na sua máquina local,
# do mesmo jeito que ele gerenciaria recursos de nuvem (AWS, GCP etc).

terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

# 1) Builda a imagem chamando "docker build" diretamente pelo terminal.
#    OBS: o build nativo do provider (resource "docker_image" com bloco "build")
#    tem um bug conhecido no Windows que corrompe o contexto enviado ao daemon.
#    Rodar via local-exec contorna o problema, pois usa o mesmo docker build
#    que você já testou manualmente e funcionou.
resource "null_resource" "build_postgres_image" {
  # Refaz o build sempre que o Dockerfile ou o init.sql mudarem
  triggers = {
    dockerfile_hash = filemd5("${path.module}/../Dockerfile")
    initsql_hash    = filemd5("${path.module}/../db/init.sql")
  }

  provisioner "local-exec" {
    command     = "docker build -t lab-reservation-postgres:latest -f Dockerfile ."
    working_dir = "${path.module}/.."
  }
}

# Lê a imagem que acabou de ser criada pelo local-exec acima,
# para conseguirmos referenciar o image_id dela no container.
data "docker_image" "postgres_lab" {
  name       = "lab-reservation-postgres:latest"
  depends_on = [null_resource.build_postgres_image]
}

# 2) Cria um volume nomeado para persistir os dados do banco
#    (se o container for destruído, os dados continuam existindo)
resource "docker_volume" "postgres_data" {
  name = "lab_reservation_pgdata"
}

# 3) Sobe o container usando a imagem construída acima
resource "docker_container" "postgres_lab" {
  name  = var.container_name
  image = data.docker_image.postgres_lab.id

  env = [
    "POSTGRES_DB=${var.db_name}",
    "POSTGRES_USER=${var.db_user}",
    "POSTGRES_PASSWORD=${var.db_password}",
  ]

  ports {
    internal = 5432
    external = var.db_port
  }

  volumes {
    volume_name    = docker_volume.postgres_data.name
    container_path = "/var/lib/postgresql/data"
  }

  restart = "unless-stopped"
}
