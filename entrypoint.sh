#!/bin/bash
# Script de entrada (entrypoint) para inicialização do container

# # Ativa e configura os módulos do Filebeat
filebeat modules enable apache
filebeat setup

# # Inicializa o Filebeat em segundo plano
filebeat -e &

# # Inicia o Apache (ou outro serviço principal do container)
exec "$@"