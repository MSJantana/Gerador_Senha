#!/bin/bash
# Script de entrada (entrypoint) para inicialização do container

filebeat modules enable apache
filebeat modules enable http
filebeat modules setup

packetbeat modules enable apache
packetbeat modules enable http
packetbeat modules setup

# Inicializa o Filebeat e Packetbeat em segundo plano
service filebeat start
service packetbeat start

# Inicia o Apache (ou outro serviço principal do container)
exec "$@"
