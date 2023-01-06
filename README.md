# Instalar project
```
npm install
```

# Instalar base de datos
```
npm run installDb
```

# Ejecutar servidor
```
npm start
```

# Postman
En el archivo: ServersMeli.postman_collection.json se encuentra una colección de Postman para llamar a los endpoints

# Run Redis
```
sudo docker run -d -p 6379:6379 redis
sudo docker run -d -p 6379:6379 --name myredis redis  #It can't be repeated
```

# Run RabbitMQ
```
docker run -d --hostname my-rabbit --name some-rabbit rabbitmq:3
```

# Manage Redis
```
npm install -g redis-commander
redis-commander
```


# To do
-listByIdShop method is fetching data of all the shops when the user is not a shop

# Microservices
-Product
-Shop
-Customer
-Cart
-Orders