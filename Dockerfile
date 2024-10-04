FROM httpd:2.4.62

# Instalação do editor vi, curl e atualização do sistema
RUN apt-get update && \
    apt-get install -y apt-transport-https curl gnupg2 vim && \
    curl -L https://artifacts.elastic.co/GPG-KEY-elasticsearch | gpg --dearmor -o /usr/share/keyrings/elastic-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/elastic-archive-keyring.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list && \
    apt-get update && \
    apt-get install -y filebeat packetbeat && \
    sed -i 's/#\(CustomLog.*\)/\1/' /usr/local/apache2/conf/httpd.conf && \
    rm -f /etc/filebeat/filebeat.yml && \
    rm -rf /var/lib/apt/lists/*

# Copia os arquivos da aplicação para o diretório htdocs do Apache
COPY . /usr/local/apache2/htdocs/

# Configuração do Filebeat para coletar logs do Apache
COPY filebeat.yml /etc/filebeat/filebeat.yml

# Copia o script entrypoint
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Torna o script executável
RUN chmod +x /usr/local/bin/entrypoint.sh

# Exponha a porta 80 do Apache (porta padrão HTTP)
EXPOSE 80

# Comando para iniciar o Filebeat e o Apache
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["httpd-foreground"]