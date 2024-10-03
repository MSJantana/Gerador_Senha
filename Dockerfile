FROM httpd:2.4.62

# Instalação do editor vi, curl e atualização do sistema
RUN apt-get update && \
    apt-get install -y apt-transport-https curl gnupg2 vim && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

# Adiciona a chave GPG e o repositório do Elastic
RUN curl -L https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add - && \
    echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" >> /etc/apt/sources.list.d/elastic-7.x.list

# Instala o Filebeat
RUN apt-get update && \
    apt-get install -y filebeat && \
    rm -rf /var/lib/apt/lists/*

# Habilitar o CustomLog no httpd.conf (descomenta a linha do CustomLog)
RUN sed -i 's/#\(CustomLog.*\)/\1/' /usr/local/apache2/conf/httpd.conf

# Copia os arquivos da aplicação para o diretório htdocs do Apache
COPY . /usr/local/apache2/htdocs/

# Configuração do Filebeat para coletar logs do Apache
COPY filebeat.yml /etc/filebeat/filebeat.yml

# Exponha a porta 80 do Apache (porta padrão HTTP)
EXPOSE 80

# Comando para iniciar o Filebeat e o Apache
CMD ["service", "filebeat", "start", "&&", "httpd-foreground"]

