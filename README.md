# Chronos

Tienda web de relojes desarrollada en React (Create React App).

## Datos compartidos (contrato de datos)

Varias partes del proyecto leen y escriben la misma información en `localStorage`. Para que los módulos no se rompan entre sí, todos siguen estas reglas.

| Datos | Clave en localStorage | Forma del objeto | Cómo leer y escribir |
|---|---|---|---|
| Usuarios | `chronos_usuarios` | `src/models/Usuario.js` | Solo mediante `src/services/usuarioService.js` |
| Sesión | Pendiente (la define Login) | Pendiente | Pendiente |
| Productos | Pendiente (la define el módulo de productos) | Pendiente | Pendiente |

### Reglas

1. **No escribir en `localStorage` directamente.** Usar siempre el servicio correspondiente: es el que normaliza los datos (por ejemplo, el correo en minúsculas) y evita duplicados.
2. **Los ids son texto (string).** `useParams()` siempre devuelve texto, así que comparar con ids numéricos falla sin mostrar errores.
3. **Agregar un campo es seguro; renombrar o eliminar uno rompe otros módulos.** Antes de renombrar o eliminar, avisar al equipo.
4. **Todo pull request que modifique `src/models/` o `src/services/` debe ser revisado por otro integrante** antes del merge.
5. **Antes de cada push, ejecutar `npm test`.** Las pruebas de contrato (`*.contrato.test.js`) fallan si alguien cambia una clave, un nombre de campo o una regla de normalización.

### Cuándo actualizar esta sección

Solo al agregar una nueva área de datos compartidos (por ejemplo, cuando se definan Sesión o Productos). Los campos de cada objeto **no** se listan aquí: la fuente de verdad es el archivo del modelo.

### Deuda técnica conocida

- Las contraseñas se guardan en texto plano en `localStorage` porque el proyecto no tiene backend. No es un sistema de autenticación real.

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
