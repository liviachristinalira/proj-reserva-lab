# main.tf
# Provider "kreuzwerker/docker": permite ao Terraform gerenciar
# recursos Docker (imagens, containers, volumes, redes) na máquina local,
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

# 1 Builda a imagem a partir do Dockerfile customizado
resource "docker_image" "postgres_lab" {
  name = "lab-reserva-postgres:latest"
  build {
    context    = "${path.module}/.."   # raiz do projeto, onde está o Dockerfile
    dockerfile = "Dockerfile"
  }
}

# 2 Cria um volume nomeado para persistir os dados do banco
#    se o container for destruído, os dados continuam existindo
resource "docker_volume" "postgres_data" {
  name = "lab_reserva_pgdata"
}

# 3 Sobe o container usando a imagem construída acima
resource "docker_container" "postgres_lab" {
  name  = var.container_name
  image = docker_image.postgres_lab.image_id

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
