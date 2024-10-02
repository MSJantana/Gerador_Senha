#!bin/sh
# Script de entrada (entrypoint) para inicialização do container

# Inicializa o Filebeat e Packetbeat em segundo plano
service filebeat start
service packetbeat start

# Inicia o Apache (ou outro serviço principal do container)
exec "$@"
