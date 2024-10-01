FROM httpd:2.4

# Instala pacotes necessários e o Filebeat
RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -L https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add - && \
    echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" \
    | tee -a /etc/apt/sources.list.d/elastic-7.x.list && \
    apt-get update && apt-get install -y filebeat packetbeat && \
    rm -rf /var/lib/apt/lists/*

# Copia os arquivos da aplicação para o diretório htdocs do Apache
COPY . /usr/local/apache2/htdocs/

# Copia os arquivos de configuração do Filebeat e Packetbeat para o container
COPY filebeat.yml /etc/filebeat/filebeat.yml
COPY packetbeat.yml /etc/packetbeat/packetbeat.yml

# Define o comando padrão de entrada
CMD ["httpd-foreground"]

