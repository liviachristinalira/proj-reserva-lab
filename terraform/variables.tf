# variables.tf
# Aqui são declaradas as variáveis que o Terraform vai usar.
# Isso evita hardcode e facilita mudar valores sem mexer no main.tf

variable "db_name" {
  description = "Nome do banco de dados"
  type        = string
  default     = "lab_reserva"
}

variable "db_user" {
  description = "Usuário do banco"
  type        = string
  default     = "lab_admin"
}

variable "db_password" {
  description = "Senha do banco (em produção, NUNCA deixe um default aqui)"
  type        = string
  default     = "memuda"
  sensitive   = true
}

variable "db_port" {
  description = "Porta exposta no host para o Postgres"
  type        = number
  default     = 5432
}

variable "container_name" {
  description = "Nome do container Docker"
  type        = string
  default     = "lab_reserva_db"
}
