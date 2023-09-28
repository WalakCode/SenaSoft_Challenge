# SenaSoft_Challenge

**GeomrtryGraph App**

esta aplicacion consta de un crud y manejo de datos por archivo json o manuales con el fin de mostrar en forma de nodos y conexiones, un manejo de rutas rapidas desde un nodo a todos los demas

# Informacion

las carpetas se encuentran dividas entre carpetas de codigo y carpeta de ayuda
**carpetas de ayuda**
- `json`: es un carpeta donde estaran json pre hechos para que subas a la base de datos y para que veas la estructura que debes tener si deseas hacer uno por tu cuenta
- `pdf`: estan los pdf del reto siigo y tambien la documentacion general del proyecto(si usas visual studio code descarga la extencion que te permite ver el archivo desde ahi)
- `sql `: esta la base de datos para que la importes 
- `package.json`y`package-lock.json`: archivos de node por si quieres ver o editar algo de la forma en que se ejecuta el proyecto o ver mas en detalle los modulos y las versiones que se usaron
- `README.md`: es este archivo de informacion general para la instalacion y uso de la app

# instalacion

**se necesita tener instalado:**

- node.js
- base de datos mysql 

# Ejecucion

**pasos**
- se coloca el comando `npm install` dentro de la carpeta del proyecto para instalar todos los modulos necesarios para iniciar
- se exporta la base de datos ubicada en `/sql/mapa.sql` (si usas `xampp` se crea una base de datos llamda mapa y exportas las tablas)
-inicias la base de datos
-se usa el comando `npm start` para iniciar la aplicacion y accedes desde el navegador en [Aplicacion](http://localhost:3000/)


**uso**
- se registra en la pagina inicial una vez registrado pasaras a la subida de datos
- si ya tienes la cuenta le das en iniciar sesion y agregas tus datos ya guardados
- puedes subir un json que tenga la siguiente estructura de ejemplo que esta en `/json/prueba`
- o subirlo manual los nodos y las conexiones
- una vez subido puedes ir a la pagina siguiente en el boton `sigue`
- veras la lista de nodo y conexiones que susbiste en json o manual
- si subiste un json puedes darle al boton de `busca` y buscara desde el incio que le diste en el json
- si lo hiciste manual o prefieres otro inicio escribe el nodo el cual quieres iniciar y dale en `busca`
- veras la lista de rutas y pesos y la forma mas rapida de llegar a cada no (o si no se puede llegar)

# Autores
- **Hansen Joan Gil**
- **Brayan Alexis Estrada Pedroza**

Sena Soft reto siigo
