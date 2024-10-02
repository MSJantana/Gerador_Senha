#!/bin/bash
# Script de entrada (entrypoint) para inicialização do container

# Ativa e configura os módulos do Filebeat
filebeat modules enable apache
filebeat modules enable http
filebeat setup

# Ativa e configura os módulos do Packetbeat
packetbeat modules enable apache
packetbeat modules enable http
packetbeat setup

# Inicializa o Filebeat em segundo plano
filebeat -e &

# Inicializa o Packetbeat em segundo plano
packetbeat -e &

# Inicia o Apache (ou outro serviço principal do container)
exec "$@"
