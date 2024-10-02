FROM httpd:2.4

# Instala pacotes necessários e o Filebeat
RUN apt-get update && apt-get install -y apt-transport-https curl gnupg2 && \
    curl -L https://artifacts.elastic.co/GPG-KEY-elasticsearch | gpg --dearmor -o /usr/share/keyrings/elastic-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/elastic-archive-keyring.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list && \
    apt-get update && apt-get install -y filebeat packetbeat && \
    rm -rf /var/lib/apt/lists/*

# Copia os arquivos da aplicação para o diretório htdocs do Apache
COPY . /usr/local/apache2/htdocs/

# Copia os arquivos de configuração do Filebeat e Packetbeat para o container
COPY filebeat.yml /etc/filebeat/filebeat.yml

# Copia o script de entrypoint
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Torna o script executável
RUN chmod +x /usr/local/bin/entrypoint.sh

# Exponha a porta do Apache (porta 80)
EXPOSE 80

# Define o script de entrypoint e o comando padrão
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["httpd-foreground"]




