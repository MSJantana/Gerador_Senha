# Usando a imagem base do Apache
FROM httpd:2.4.62

# Instalação do editor vi, curl e atualização do sistema
RUN apt-get update && \
    apt-get install -y vim curl && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

# Habilitar o CustomLog no httpd.conf (descomenta a linha do CustomLog)
RUN sed -i 's/#\(CustomLog.*\)/\1/' /usr/local/apache2/conf/httpd.conf

# Copia os arquivos da aplicação para o diretório htdocs do Apache
COPY . /usr/local/apache2/htdocs/

# Exponha a porta 80 do Apache (porta padrão HTTP)
EXPOSE 80

# Define o comando padrão para iniciar o Apache
CMD ["httpd-foreground"]
