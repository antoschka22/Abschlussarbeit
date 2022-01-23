FROM nginx:1.17.1-alpine
#assings this image as nginx (nginx is a webserver)
#using 1.17.1 version with alpine (alpine is a lightweight version of ngingx)

COPY nginx.conf /etc/nginx/nginx.conf
#copies the config file and adds it to the filesystem of the container

RUN rm /usr/share/nginx/html/index.html
RUN rm /usr/share/nginx/html/50x.html
# removes the standard index.html of nginx

COPY immosolution-frontend/dist/immosolution-frontend /usr/share/nginx/html
# copies the immosolution_frontend folder
# and adds them to the filesystem of the container at the path (/usr/share/nginx/html)
# this is a nginx norm, whatever is in the nginx/html folder is shown when communicating with the webserver