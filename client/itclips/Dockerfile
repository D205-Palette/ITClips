
FROM nginx
WORKDIR /home/ubuntu/frontend
RUN mkdir ./build
ADD ./build ./build
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]


