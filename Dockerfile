# Imagem base do Ubuntu 20.04
FROM ubuntu:20.04

# Define o fuso horário para UTC
ENV TZ=UTC

# Instalação e configuração em um único comando RUN
RUN apt-get update && \
    apt-get install -y apache2 apt-transport-https curl gnupg2 tzdata vim && \
    apt-get clean && \
    ln -fs "/usr/share/zoneinfo/$TZ" /etc/localtime && \
    dpkg-reconfigure --frontend noninteractive tzdata && \
    curl -L https://artifacts.elastic.co/GPG-KEY-elasticsearch | gpg --dearmor -o /usr/share/keyrings/elastic-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/elastic-archive-keyring.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list && \
    apt-get update && \
    apt-get install -y filebeat packetbeat && \
    rm -rf /var/lib/apt/lists/*

# Habilita e configura o Apache para gerar logs
RUN sed -i 's/#\(CustomLog.*\)/\1/' /etc/apache2/apache2.conf  

# Copia os arquivos da aplicação para o diretório padrão do Apache
COPY . /var/www/html/

# Configuração do Filebeat para coletar logs do Apache
COPY filebeat.yml /etc/filebeat/filebeat.yml

# Copia o script entrypoint
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Torna o script executável
RUN chmod +x /usr/local/bin/entrypoint.sh

# Exponha a porta 80 do Apache (porta padrão HTTP)
EXPOSE 80

# Define o Apache e o Filebeat para iniciar juntos
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["apachectl", "-D", "FOREGROUND"]
