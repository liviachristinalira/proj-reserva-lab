# outputs.tf
# Informações úteis exibidas depois do "terraform apply"

output "container_name" {
  value = docker_container.postgres_lab.name
}

output "connection_string" {
  value       = "postgresql://${var.db_user}:${var.db_password}@localhost:${var.db_port}/${var.db_name}"
  description = "String de conexão para usar no seu app Node (.env)"
  sensitive   = true
}
