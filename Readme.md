# PROYECTO BACKEND

## Tabla de Contenidos

1. [Funcionamiento](#funcionamiento)
2. [Tecnologías Empleadas](#tecnologías-empleadas)
3. [Imágenes](#imágenes)
4. [Manual de Instalación y Deployment](#manual-de-instalación-y-deployment)

## Funcionamiento

El proyecto consiste en desarrollar un servidor backend para un eCommerce llamado "The Bridge". Este eCommerce se enfoca en la venta de mercancía variada, dividida en diferentes categorías según sus temas. El servidor utilizará tecnologías como Sequelize, MySQL, Express, Node.js y Nodemon para gestionar categorías, productos, pedidos y autenticación de usuarios.

## Tecnologías Empleadas

-   Node.js
-   Express.js
-   Sequelize
-   MySQL
-   Nodemon

## Imágenes

## Manual de Instalación y Deployment

Para instalar y ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio desde GitHub.

2. ## 1.2 Manual de Instalación y Deployment

Para comenzar con el proyecto, sigue estos pasos:

1. **Inicializar el Proyecto y Instalar Dependencias:**

    - Ejecuta los siguientes comandos para inicializar el proyecto e instalar las dependencias necesarias:

        ```
        npm init -y
        npm install express sequelize mysql2
        ```

    - Si aún no tienes Sequelize instalado globalmente, puedes hacerlo ejecutando el siguiente comando:

        ```
        npm install sequelize-cli -g
        ```

    - Si deseas instalar Nodemon para facilitar el desarrollo, ejecuta el siguiente comando:
        ```
        npm install nodemon --save-dev
        ```

2. **Inicializar Sequelize:**

    - Inicializa Sequelize en tu proyecto ejecutando el siguiente comando:
        ```
        sequelize init
        ```

3. **Actualizar el Archivo package.json:**

    - Modifica el archivo `package.json` para incluir scripts que faciliten el inicio y desarrollo del proyecto. Recomendamos utilizar los siguientes scripts:

        ```json
        "scripts": {
            "start": "node index.js",
            "dev": "nodemon index.js"
        }
        ```

    - Si deseas solo probar el proyecto, puedes usar el script `start`. Si deseas realizar cambios y probarlos automáticamente, utiliza el script `dev` con Nodemon.
      .

4. Configura la base de datos MySQL y ajusta la configuración en el archivo de configuración.

5. **Configuración de la Base de Datos:**

    - Copia el archivo `config_example.json` y renómbralo como `config.json`.

    - En la sección `development` del archivo `config.json`, agrega los siguientes datos correspondientes a tu entorno local:

        ```
        Reemplaza `"tu_usuario_de_mysql"`, `"tu_contraseña_de_mysql"`, `"nombre_de_tu_base_de_datos"` y `"tu_clave_secreta_para_jwt"` con los valores adecuados.
        ```

6. **Creación de la Base de Datos y Migración:**

    - Una vez que hayas configurado `config.json`, puedes crear la base de datos ejecutando el siguiente comando de Sequelize:

        ```
        sequelize db:create
        ```

    - Luego, para generar las tablas necesarias en la base de datos, ejecuta el siguiente comando:
        ```
        sequelize db:migrate
        ```

7. Una vez hayas iniciado el servidor, podrás acceder a la aplicación desde tu navegador web utilizando la URL local proporcionada. Te recomendamos utilizar Postman para probar los distintos endpoints.