# Chronos

Tienda web de relojes desarrollada en React (Create React App).

## Datos compartidos (contrato de datos)

Varias partes del proyecto leen y escriben la misma información en `localStorage`. Para que los módulos no se rompan entre sí, todos siguen estas reglas.

| Datos | Clave en localStorage | Forma del objeto | Cómo leer y escribir |
|---|---|---|---|
| Usuarios | `chronos_usuarios` | `src/models/Usuario.js` | Solo mediante `src/services/usuarioService.js` |
| Sesión | `chronos_sesion` | `{ id, rol }` (nunca la contraseña) | Solo mediante `src/services/sesionService.js` |
| Productos | Pendiente (la define el módulo de productos) | Pendiente | Pendiente |

### Reglas

1. **No escribir en `localStorage` directamente.** Usar siempre el servicio correspondiente: es el que normaliza los datos (por ejemplo, el correo en minúsculas) y evita duplicados.
2. **Los ids son texto (string).** `useParams()` siempre devuelve texto, así que comparar con ids numéricos falla sin mostrar errores.
3. **Agregar un campo es seguro; renombrar o eliminar uno rompe otros módulos.** Antes de renombrar o eliminar, avisar al equipo.
4. **Todo pull request que modifique `src/models/` o `src/services/` debe ser revisado por otro integrante** antes del merge.
5. **Antes de cada push, ejecutar `npm test`.** Las pruebas de contrato (`*.contrato.test.js`) y de reglas (`*.reglas.test.js`) fallan si alguien cambia una clave, un nombre de campo o una regla de normalización.

### Cuándo actualizar esta sección

Solo al agregar una nueva área de datos compartidos (por ejemplo, cuando se definan Sesión o Productos). Los campos de cada objeto **no** se listan aquí: la fuente de verdad es el archivo del modelo.

### Administrador inicial

Al iniciar la aplicación, si no existe ningún administrador, se crea automáticamente esta cuenta (`asegurarAdminInicial()` en `index.js`):

| Correo | Contraseña |
|---|---|
| `adminduoc@chronos.cl` | `Duoc2026$#` |

Reglas:
- El sistema nunca puede quedar sin administradores: no se puede eliminar al último administrador ni quitarle el rol `admin`. Para hacerlo, primero hay que crear otro administrador.
- Si alguien registró ese correo como cliente y no hay administradores, la cuenta se convierte en administrador y su contraseña vuelve a la de esta tabla.
- Estas credenciales son solo para la demostración (repositorio público, sin backend). No reutilizar esta contraseña en cuentas reales.

### Para Login

Para buscar un usuario por correo, usar `obtenerPorCorreo(correo)` de `usuarioService`. Ignora mayúsculas y espacios, y devuelve `null` si no existe. Comparar la contraseña y guardar la sesión es responsabilidad del módulo de Login.

### Sesión y rutas protegidas

- Login llama a `guardarSesion(usuario)` después de validar correo y contraseña.
- `obtenerSesion()` devuelve el usuario actual **leído de nuevo** desde `usuarioService`, o `null`. Si el usuario fue eliminado, la sesión se borra; si le quitaron el rol admin, deja de ser admin. Nunca confiar en el `rol` guardado en la sesión.
- Todas las rutas `/admin-*` van dentro de `<Route element={<RutaProtegida />}>` en `App.js`. Sin sesión redirige a `/login`; con rol cliente, a `/`. **Toda ruta admin nueva debe agregarse dentro de ese bloque.**
- Para cerrar sesión, usar el componente `BotonCerrarSesion` (`src/components/sesion/`).

### Deuda técnica conocida

- Las contraseñas se guardan en texto plano en `localStorage` porque el proyecto no tiene backend. No es un sistema de autenticación real.
- La protección de rutas es solo de interfaz: quien edite `localStorage` desde las herramientas del navegador puede saltársela. Sin backend no hay forma de evitarlo.

## Contacto, Blog y despliegue

### Páginas de Contacto y Blog

##### Contacto (`src/Pages/Contacto.js`)

Formulario hecho con **react-hook-form v7** y componentes de **React-Bootstrap** (`Form`, `Card`, `Alert`, `Button`).

| Campo | Reglas |
|---|---|
| Nombre completo | Obligatorio, sin contar espacios; máximo 100 caracteres |
| Correo | Obligatorio; formato válido (misma expresión regular que usa el registro de usuarios) |
| Comentario | Obligatorio; máximo 500 caracteres, con contador visible |

- Los errores se muestran bajo cada campo (`isInvalid` + `Form.Control.Feedback`) al salir del campo o al enviar, y quedan enlazados al campo con `aria-invalid` y `aria-describedby` para lectores de pantalla.
- Al enviar datos válidos aparece un mensaje de confirmación y el formulario se limpia (con `reset()` en un `useEffect` que observa `isSubmitSuccessful`, como recomienda react-hook-form).
- **No guarda los mensajes**: el proyecto no tiene backend y el contrato de datos no define un área "Mensajes". Si se necesita guardarlos, crear un servicio (`src/services/`) y agregar la fila al contrato.

##### Blog (`src/Pages/Blogs.js`, `Blog1.js`, `Blog2.js`)

- `Blogs` muestra una tarjeta (`Card` de React-Bootstrap) por artículo, con botón **Leer más** (`Link` de React Router) que lleva a su ruta.
- `Blog1` y `Blog2` muestran el artículo completo y un enlace para volver a `/blogs`.
- Cada página está completa en su propio archivo; no depende de otros componentes del proyecto.

**Agregar un artículo:** crear `Blog3.js` copiando `Blog1.js`, sumar su tarjeta en la lista `BLOGS` de `Blogs.js` y registrar la ruta `/blog3` en `App.js`.

### Diseño responsivo

Bootstrap se importa una sola vez en `src/index.js`, antes de `index.css` para que los estilos propios puedan sobrescribirlo:

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

`public/index.html` ya incluye `<meta name="viewport" content="width=device-width, initial-scale=1" />`, indispensable para que los breakpoints funcionen en celulares.

Breakpoints de Bootstrap usados:

| Prefijo | Desde | Dispositivo típico |
|---|---|---|
| `xs` | 0 px | Celular |
| `sm` | 576 px | Celular horizontal |
| `md` | 768 px | Tablet |
| `lg` | 992 px | Notebook |

| Página | Celular | Tablet | Escritorio |
|---|---|---|---|
| Blogs | 1 tarjeta por fila (`xs={1}`) | 2 por fila (`md={2}`) | 2 por fila |
| Artículo | Ancho completo (`xs={12}`) | Columna de 10/12 centrada | Columna de 8/12 (lectura cómoda) |
| Contacto | Ancho completo, botón a todo el ancho (`d-grid`) | Columna de 8/12 | Columna de 6/12 |

Para probarlo: abrir las herramientas de desarrollo del navegador (F12) → modo dispositivo (Ctrl + Shift + M) y cambiar el ancho.

### Despliegue en AWS EC2 (guía 2.2.2 corregida)

Pasos para levantar **este proyecto** en una instancia EC2. Los comandos son para **Amazon Linux 2023** (usuario `ec2-user`). En **Ubuntu** cambia `ec2-user` por `ubuntu` y `dnf` por `apt`.

##### 1. Preparar la instancia y el grupo de seguridad

En **EC2 → Instancias**, con la instancia en estado *En ejecución*, revisa su **grupo de seguridad → Reglas de entrada** y agrega:

| Tipo | Puerto | Origen | Para qué |
|---|---|---|---|
| SSH | 22 | Mi IP | Conectarse a la instancia |
| TCP personalizado | 3000 | Mi IP | Modo desarrollo (`npm start`) |
| HTTP | 80 | 0.0.0.0/0 | Producción con Nginx |

> Usa **Mi IP** en lugar de `0.0.0.0/0` para los puertos 22 y 3000: dejarlos abiertos a todo internet expone la instancia.

##### 2. Conectarse por SSH

En **Instancias → Conectar → Cliente SSH** AWS muestra el comando exacto. Desde la carpeta donde está la llave `.pem`:

**Linux / macOS**

```bash
chmod 400 userReact.pem
ssh -i "userReact.pem" ec2-user@<DNS-o-IP-publica>
```

**Windows (PowerShell, no hace falta abrirlo como administrador)**

```powershell
icacls .\userReact.pem /inheritance:r
icacls .\userReact.pem /grant:r "$($env:USERNAME):(R)"
ssh -i .\userReact.pem ec2-user@<DNS-o-IP-publica>
```

La primera vez responde `yes` para aceptar la huella del servidor.

> Alternativa sin llave: **Conectar → EC2 Instance Connect** abre una terminal en el navegador.
> La llave `.pem` **nunca** se sube al repositorio (ya está en `.gitignore`).

##### 3. Instalar Node.js y Git en la instancia

La instancia viene sin Node.js. Se instala con **nvm**:

```bash
sudo dnf install -y git tmux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22      # versión probada con react-scripts 5; versiones más nuevas no están probadas
node -v && npm -v
```

##### 4. (Instancias de 1 GB de RAM) Agregar memoria swap

En `t2.micro` / `t3.micro`, `npm install` y `npm run build` pueden fallar por falta de memoria ("JavaScript heap out of memory" o el proceso termina con `Killed`). Crear 2 GB de swap lo evita:

```bash
sudo dd if=/dev/zero of=/swapfile bs=128M count=16
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile swap swap defaults 0 0' | sudo tee -a /etc/fstab
```

##### 5. Clonar el proyecto e instalar dependencias

```bash
git clone https://github.com/<tu-usuario>/Chronos.git
cd Chronos
npm ci          # usa npm install si package-lock.json aún no incluye Bootstrap
```

No hace falta instalar `create-react-app` ni crear un proyecto nuevo: el proyecto ya existe y las dependencias (`bootstrap`, `react-bootstrap`, `react-hook-form`) están en `package.json`. El import de Bootstrap ya está en `src/index.js`.

##### 6. Opción A — Modo desarrollo (`npm start`)

Se ejecuta dentro de `tmux` para que la app siga funcionando al cerrar la conexión SSH:

```bash
tmux new -s chronos
BROWSER=none npm start
```

- Salir de tmux sin detener la app: `Ctrl + B`, luego `D`.
- Volver a la sesión: `tmux attach -t chronos`.

Comprobar, primero desde la instancia y luego desde tu navegador:

```bash
curl -I http://localhost:3000        # debe responder HTTP/1.1 200 OK
```

```
http://<IP-publica>:3000
```

> `nohup npm start &` por sí solo **no** sirve: el servidor de Create React App se cierra cuando la terminal no tiene entrada (salvo que se ejecute con `CI=true`). Por eso se recomienda tmux.

##### 7. Opción B — Producción con Nginx (recomendada)

```bash
npm run build
sudo dnf install -y nginx
sudo mkdir -p /var/www/chronos
sudo cp -r build/* /var/www/chronos/
```

Crear `/etc/nginx/conf.d/chronos.conf` (`sudo nano /etc/nginx/conf.d/chronos.conf`):

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/chronos;
    index index.html;

    # Necesario para React Router: /contacto, /blogs, etc. no son archivos reales,
    # así que se responde index.html y React decide qué página mostrar.
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Los archivos de build/static llevan hash en el nombre: se pueden cachear.
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Quitar la marca `default_server` del bloque de ejemplo que trae Nginx (para que responda `chronos.conf`), validar y arrancar:

```bash
# Amazon Linux 2023 (si nginx.conf no tiene default_server, este comando no cambia nada)
sudo sed -i 's/ default_server//g' /etc/nginx/nginx.conf
# Ubuntu: en su lugar, eliminar el sitio por defecto
# sudo rm /etc/nginx/sites-enabled/default

sudo nginx -t
sudo systemctl enable --now nginx
```

`nginx -t` puede mostrar el aviso `conflicting server name "_"`: es esperable y no impide arrancar.

La app queda en `http://<IP-publica>` (puerto 80). Para publicar cambios: `git pull && npm ci && npm run build && sudo cp -r build/* /var/www/chronos/`.

> Sin la línea `try_files`, recargar el navegador en `/contacto` o `/blog1` da **404**.

##### 8. Verificación

- [ ] `/` muestra la página de inicio.
- [ ] `/blogs` muestra las tarjetas; **Leer más** abre `/blog1` y `/blog2`.
- [ ] Recargar el navegador (F5) en `/blog1` y `/contacto` sigue funcionando (prueba de `try_files`).
- [ ] En `/contacto`, enviar vacío muestra los tres errores; un correo sin `@` muestra error de formato; datos válidos muestran la confirmación.
- [ ] En modo dispositivo (F12 → Ctrl + Shift + M) las tarjetas pasan a una columna y el formulario ocupa todo el ancho.

---

### Correcciones respecto a la guía 2.2.2

| # | La guía dice | Problema | Corrección aplicada |
|---|---|---|---|
| 1 | Bloques de código con `´´´` | Son tildes, no comillas invertidas: Markdown no los reconoce como código | Se usa ```` ``` ```` |
| 2 | Abrir CMD como administrador y ejecutar el comando SSH | En Windows SSH rechaza la llave si sus permisos son abiertos ("UNPROTECTED PRIVATE KEY FILE"); `chmod` no existe en CMD | Paso 2: `icacls` en PowerShell, sin administrador |
| 3 | `npm install -g create-react-app` sin instalar Node antes | La instancia no trae Node; además Create React App está obsoleto y no se recomienda instalarlo globalmente | Paso 3: Node LTS con nvm; para este proyecto no se crea un proyecto nuevo |
| 4 | `npm install Bootstrap` | El paquete se llama `bootstrap` en minúsculas | `bootstrap` (ya declarado en `package.json`) |
| 5 | Usar `find` y `nano` para agregar el import de Bootstrap | Paso manual propenso a errores en cada instancia | El import ya está en `src/index.js` y viene con el repositorio |
| 6 | `useForm()` con `const { register, handleSubmit, errors }` y `ref={register({...})}` | Es la API de react-hook-form **v6**. En la v7 (la que instala npm) `errors` no existe en ese lugar y `register` no recibe un objeto: el formulario falla | v7: `formState: { errors }` y `{...register('correo', { required, pattern })}` (ver `Contacto.js`) |
| 7 | Validar el correo con `email.includes('@')` | Acepta valores como `a@` | Expresión regular de formato de correo |
| 8 | `curl http://tu-ip-publica:3000` antes de `npm start` | No hay nada escuchando todavía; además el grupo de seguridad se configura en la consola de AWS, no con `curl` | Paso 1 (grupo de seguridad) y paso 6 (`curl` después de arrancar) |
| 9 | `npm start` directo en la sesión SSH | La app se detiene al cerrar la terminal | `tmux` (paso 6) o Nginx (paso 7) |
| 10 | "Para producción usar Nginx", sin pasos | Con React Router, Nginx sin `try_files` responde 404 al recargar cualquier ruta | Paso 7 con configuración completa |
| 11 | — | En instancias de 1 GB el build puede quedarse sin memoria | Paso 4: swap |
| 12 | Pasos 9, 11, 13 y 16: reemplazar `src/App.js` completo con los ejemplos | En este proyecto borraría todas las rutas | No se toca `App.js`; los ejemplos ya están aplicados en `Contacto.js` (Bootstrap + react-hook-form) y `Blogs.js` |
| 13 | Puerto 3000 abierto sin indicar origen | Abrirlo a `0.0.0.0/0` expone el servidor de desarrollo | Origen **Mi IP** |

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
