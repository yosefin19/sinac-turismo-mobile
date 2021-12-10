# Proyecto SINAC Turismo: Móvil

La presente aplicación fue realizada por Brandon Ledezma Fernández, Walter Morales Vásquez y Yosefin Solano Marín con la finalidad de que sea de utilidad para la organización SINAC en Costa Rica, la cual es encargada de la administración de las áreas protegidas e integra las competencias en materia forestal, vida silvestre  y la protección y conservación del uso de cuencas hidrográficas y sistemas hídricos con el fin de dictar políticas, planificar y ejecutar procesos dirigidos a lograr la sostenibilidad en el manejo de los recursos naturales del país.

![sinac](https://user-images.githubusercontent.com/56206208/145642076-3dc33fa7-f16a-4fd0-932c-bc4a2a861462.png)

## Objetivo

Con el desarrollo de la aplicación se planea resolver el problema de que los turistas costarricenses o internacionales que visitan la página del SINAC requieren de un fácil acceso a la información de sitios turísticos registrados por dicha organización, asimismo, existe la necesidad de poder mejorar el proceso de compra y reserva para visitar estos lugares. Esta aplicación plantea permitir a los turistas realizar dichas acciones de una forma centralizada y rápida, así como también poder compartir sus experiencias en los destinos registrados con las demás personas.

## Requerimientos generales

### 1 Acceso a información de áreas de conservación
El sistema permitirá a los visitantes poder seleccionar una área de conservación para obtener información sobre la zona, en esta sección el visitante podrá observar un listado de imágenes de la zona, el nombre del área, además el usuario puede marcar esta como favorito y observar la ubicación sobre el mapa del mismo.
### 2 Acceso a información de destinos turísticos
El sistema debe permitir a los visitantes poder seleccionar un destino turístico para obtener información sobre dicho destino, cada uno tendrá nombre, descripción, un listado de fotografías de diferentes puntos del lugar, horario de atención, tarifas de entradas, recomendaciones para la visita, dificultad de la estadía y sus zonas, y ubicación exacta en el mapa.
### 3 Búsqueda y filtrado de destinos
El sistema permitirá a los usuarios realizar la búsqueda de destinos para visitar u obtener información sobre el mismo. Además, debe poseer funcionalidad para filtrar los destinos turísticos según las etiquetas de playa, montaña, bosque y volcán, según lo que el usuario se encuentre buscando.
### 4 Opiniones de usuarios
El sistema permite a los usuarios poder comentar sus opiniones sobre el destino con los demás usuarios, para que estos compartan un comentario, fotografías y su calificación.
### 5 Favoritos
El usuario puede marcar como favorito cualquier área de conservación o destino turístico desde la sección propia de cada uno o desde los lugares donde se encuentren listados en la aplicación.
### 6 Registro y manejo de usuarios
Un usuario puede registrarse en la aplicación y actualizar datos como su correo electrónico, nombre, número de teléfono, foto de perfil y banner. Una vez iniciada la sesión esta se mantiene activa hasta que el usuario decida cerrarla.

5.6 Administración de áreas de conservación
Un usuario administrador puede realizar funciones de creación, lectura, actualización y eliminación de las áreas de conservación en la aplicación. En esta podrá aplicar lo anterior a un listado de imágenes de la zona, el nombre del área y la ubicación sobre el mapa del mismo.
5.7 Administración de destinos turísticos.
Deberá existir un conjunto de opciones para crear, mostrar, modificar y eliminar destinos turísticos para usuarios administradores. Cada destino turístico tendrá nombre, descripción, fotografías, horario, tarifas, recomendaciones, dificultad y ubicación exacta en el mapa.
5.8 Administración de usuarios.
Un administrador es capaz de realizar funciones de creación, lectura, actualización y eliminación de los usuarios en la aplicación. Presenta campos para nombre de usuario, correo electrónico, contraseña y teléfono. La contraseña del usuario deberá encontrarse cifrada.
5.9 Administración de perfiles.
Deberá existir un conjunto de opciones para crear, actualizar, mostrar y eliminar perfiles de usuarios para usuarios administradores. Cada perfil contiene el nombre, correo electrónico, número telefónico y contraseña de un usuario.


## Ejecución de programa

- Es necesario contar con NodeJS, de igual forma es necesario contar con React Native y Expo.

- Se debe descargar el contenido desde su respectivo repositorio sinac-turismo-mobile.

- Seguidamente es necesario descargar y instalar la dependencias necesarias por lo que se hace uso de npm (igualmente se puede hacer uso de yarn):

```console
npm install
```

- En este momento se puede ejecutar el programa con el comando:

```console
expo start
```

- Para exportar el proyecto y obtener el correspondiente ejecutable existen distintas opciones para poder obtener un exportable compatible para la Google Play Store es necesario realizar varios pasos extra los cuales se encuentran documentados por Expo. Para obtener un archivo APK se necesita continuar con los siguientes pasos:

- Es necesario contar con una cuenta de Expo donde se guarda y exporta el proyecto, por lo que es necesario registrar las credenciales de Expo:

```console
expo login
```

- Posteriormente se procede a exportar el proyecto mediante el comando:

```console
expo build:android
```

- Se solicitará si desea generar una keystore o cuenta con una (como la de Google Play Store) por lo que debe de seleccionar la opción según las necesidades.

- A partir de este punto, desde el panel de Expo es posible acceder al ejecutable de la aplicación.

## Estado

La aplicación funciona completamente, implementando todas las funcionalidades que fueron solicitadas. Se realizaron las pruebas de funcionalidad correspondientes a cada uno de los componentes.

Se plantea en un futuro la adición de funcionalidad para la compra y reserva de tiquetes en la misma aplicación móvil (actualmente esto se debe realizar utilizando la página del SINAC que es redirigida desde la aplicación). Con esto se desea permitir a los usuarios interesados en visitar los destinos turísticos una manera más fácil de obtener sus entradas. 

Además, se proyecta añadir la oportunidad de seguir a otros usuarios registrados en la misma aplicación, esto con el fin de permitir más interacción entre los visitantes.

## Realizado por:

* Brandon Ledezma Fernández
* Walter Morales Vásquez
* Yosefin Solano Marín 
