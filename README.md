# Tutorial Hardhat + Solidity + Polygon
## Diplomatura Blockchain - UTN

### 📚 Índice
1. [Introducción Teórica](#1-introducción-teórica)
2. [Herramientas y Tecnologías](#2-herramientas-y-tecnologías)
3. [Instalación y Configuración](#3-instalación-y-configuración)
4. [Tutorial: Desarrollo Local](#4-tutorial-desarrollo-local)
5. [Tutorial: Deploy en Testnet](#5-tutorial-deploy-en-testnet)
6. [Próxima Clase: Cliente Web](#6-próxima-clase-cliente-web)
7. [Recursos y Referencias](#7-recursos-y-referencias)

---

## 1. Introducción Teórica

### ¿Qué es Hardhat?

**Hardhat** es un entorno de desarrollo profesional para Ethereum que nos permite:

- **🏗️ Desarrollar**: Escribir, compilar y testear contratos inteligentes
- **🧪 Testing**: Ejecutar pruebas automatizadas con frameworks como Mocha/Chai
- **🚀 Deploy**: Desplegar contratos en redes locales, testnets o mainnet
- **🔍 Debug**: Depurar contratos con herramientas avanzadas
- **📦 Gestionar**: Manejar dependencias y configuraciones de proyecto

### ¿Por qué Hardhat vs otras herramientas?

| Característica | Hardhat | Remix | Truffle |
|----------------|---------|-------|---------|
| **Ambiente Local** | ✅ Completo | ❌ Solo web | ✅ Sí |
| **Debugging** | ✅ Avanzado | ⚠️ Básico | ⚠️ Básico |
| **TypeScript** | ✅ Nativo | ❌ No | ⚠️ Plugin |
| **Plugins** | ✅ Ecosistema | ❌ No | ⚠️ Limitado |
| **Testing** | ✅ Mocha/Chai | ⚠️ Básico | ✅ Mocha |
| **Mainnet Forking** | ✅ Sí | ❌ No | ❌ No |

### Conceptos Clave

#### 🔗 **Blockchain Networks**
- **Local**: Hardhat Network (desarrollo)
- **Testnet**: Polygon Amoy (pruebas)
- **Mainnet**: Polygon (producción)

#### 🏦 **Smart Contracts**
- Programas autoejecutables en blockchain
- Inmutables una vez desplegados
- Interacción a través de transacciones

#### ⛽ **Gas y Transacciones**
- **Gas**: Costo computacional de operaciones
- **Gas Price**: Precio por unidad de gas
- **Gas Limit**: Máximo gas para una transacción

---

## 2. Herramientas y Tecnologías

### 🛠️ Stack de Desarrollo

#### **Lenguajes**
- **Solidity**: Lenguaje para smart contracts
- **JavaScript**: Scripts, tests y automatización
- **JSON**: Configuraciones y ABIs

#### **Frameworks y Librerías**
- **Hardhat**: Entorno de desarrollo principal
- **Ethers.js**: Librería para interactuar con Ethereum
- **Mocha/Chai**: Framework de testing
- **OpenZeppelin**: Librerías de contratos seguros

#### **Redes Blockchain**
- **Hardhat Network**: Red local para desarrollo
- **Polygon Amoy**: Testnet para pruebas
- **Polygon Mainnet**: Red de producción

#### **Herramientas Adicionales**
- **MetaMask**: Wallet para interacciones
- **Polygonscan**: Explorador de bloques
- **Faucets**: Para obtener tokens de prueba

### 📋 Prerrequisitos del Sistema

```bash
# Verificar instalaciones
node --version    # >= 18.0.0
npm --version     # >= 8.0.0
git --version     # Para control de versiones
```

---

## 3. Instalación y Configuración

### 📦 Paso 1: Clonar e Instalar

```bash
# Clonar el repositorio
git clone https://github.com/utn-blockchain-5k3/ejercicios_solidity_hardhat.git
cd ejercicios_solidity_hardhat

# Instalar dependencias
npm install
```

### ⚙️ Paso 2: Verificar Instalación

```bash
# Compilar contratos
npm run compile

# Ejecutar tests
npm test
```

**Salida esperada:**
```
✔ Debe establecer el saludo inicial correctamente
✔ Debe establecer el owner correctamente
✔ Debe cambiar el saludo global
... (más tests)

15 passing (2s)
```

### 📁 Paso 3: Estructura del Proyecto

```
ejercicios_solidity_hardhat/
├── contracts/           # Contratos Solidity
│   └── MiContrato.sol
├── scripts/            # Scripts de deploy y pruebas
│   ├── deploy.js
│   └── test-local.js
├── test/              # Pruebas automatizadas
│   └── MiContrato.js
├── hardhat.config.js  # Configuración principal
├── package.json       # Dependencias y scripts
├── .env.example       # Plantilla de variables
└── README.md         # Esta documentación
```

---

## 4. Tutorial: Desarrollo Local

### 🎯 Objetivo
Aprender a desarrollar y probar contratos en un entorno local controlado.

### 📋 Paso a Paso

#### **Paso 1: Analizar el Contrato**

Abre `contracts/MiContrato.sol` y observa:

```solidity
// Variables de estado
string public saludo = "Hola Polygon";
address public owner;
uint256 public contador;
mapping(address => string) public mensajesPersonales;
mapping(address => uint256) public interacciones;

// Eventos
event SaludoCambiado(address indexed usuario, string nuevoSaludo, uint256 timestamp);

// Modificadores
modifier soloOwner() {
    require(msg.sender == owner, "Solo el owner puede ejecutar esta funcion");
    _;
}
```

**💡 Conceptos aprendidos:**
- Variables de estado y tipos de datos
- Mappings para almacenar datos por dirección
- Eventos para logging
- Modificadores para control de acceso

#### **Paso 2: Ejecutar Pruebas**

```bash
npm test
```

**¿Qué sucede?**
1. Hardhat compila el contrato automáticamente
2. Crea una blockchain temporal en memoria
3. Ejecuta todas las pruebas definidas
4. Reporta resultados

#### **Paso 3: Demostración Completa**

```bash
npm run test:local
```

**Salida esperada:**
```
🚀 Iniciando demostración completa del contrato MiContrato...

📦 Compilando contrato...
🚢 Desplegando contrato...
✅ MiContrato desplegado en: 0x5FbDB2315678afecb367f032d93F642f64180aa3

👤 Owner (deployer): 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
👤 Usuario 1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
👤 Usuario 2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC

🧪 === DEMOSTRACIÓN DE FUNCIONALIDADES ===

1️⃣ Información inicial del contrato:
   Saludo: "Hola Polygon"
   Owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   Contador: 0

... (demostración completa)
```

#### **Paso 4: Interacción Manual (Opcional)**

```bash
# Abrir consola interactiva
npx hardhat console

# Interactuar con el contrato
> const c = await ethers.getContractAt("MiContrato", "DIRECCION_DEL_CONTRATO");
> await c.saludo()
> await c.setSaludo("Mi nuevo saludo")
> await c.setMensajePersonal("Mi mensaje")
> await c.getInfoUsuario("0x...")
```

### 🎯 **¿Qué aprendiste?**

- ✅ Compilación automática de contratos
- ✅ Despliegue en red local
- ✅ Interacción con funciones del contrato
- ✅ Manejo de eventos y estados
- ✅ Control de acceso con modificadores
- ✅ Testing automatizado

---

## 5. Tutorial: Deploy en Testnet

### 🎯 Objetivo
Desplegar el contrato en Polygon Amoy testnet para pruebas en un entorno real.

### 📋 Prerrequisitos para Testnet

#### **Paso 1: Configurar MetaMask**

1. **Instalar MetaMask**: [metamask.io](https://metamask.io)

2. **Agregar red Polygon Amoy**:
   - Nombre: `Polygon Amoy`
   - RPC URL: `https://rpc-amoy.polygon.technology`
   - Chain ID: `80002`
   - Símbolo: `MATIC`
   - Explorador: `https://amoy.polygonscan.com`

3. **Crear cuenta de prueba**:
   - ⚠️ **IMPORTANTE**: Crear una cuenta NUEVA solo para desarrollo
   - Nunca usar cuentas con fondos reales

#### **Paso 2: Obtener MATIC de Testnet**

**Faucets disponibles:**
- [Polygon Faucet](https://faucet.polygon.technology/) 
- [Alchemy Faucet](https://www.alchemy.com/faucets/polygon-amoy)
- [QuickNode Faucet](https://faucet.quicknode.com/polygon/amoy)

**Proceso:**
1. Copiar dirección de tu cuenta de prueba
2. Visitar uno de los faucets
3. Pegar dirección y solicitar MATIC
4. Esperar confirmación (1-2 minutos)

#### **Paso 3: Configurar Variables de Entorno**

```bash
# Copiar plantilla
cp .env.example .env

# Editar .env (usar tu editor preferido)
nano .env
```

**Contenido de `.env`:**
```bash
PRIVATE_KEY=tu_clave_privada_de_cuenta_de_prueba
POLYGONSCAN_API_KEY=opcional_para_verificacion
```

**⚠️ Cómo obtener la clave privada:**
1. MetaMask → Cuenta → Detalles de cuenta
2. Exportar clave privada
3. Confirmar con contraseña
4. **Copiar clave (sin 0x inicial)**

### 🚀 Paso a Paso para Deploy

#### **Paso 1: Verificar Configuración**

```bash
# Verificar que tienes MATIC
# En MetaMask, verificar balance > 0

# Verificar archivo .env
cat .env
# Debe mostrar tu PRIVATE_KEY (sin mostrar el valor real)
```

#### **Paso 2: Deploy a Testnet**

```bash
npm run deploy:amoy
```

**Salida esperada:**
```
MiContrato desplegado en: 0x742d35Cc6634C0532925a3b8D45567C6B8123456
```

#### **Paso 3: Verificar en Explorador**

1. Ir a [amoy.polygonscan.com](https://amoy.polygonscan.com)
2. Pegar la dirección del contrato
3. Observar:
   - ✅ Transaction hash del deploy
   - ✅ Block number
   - ✅ Código del contrato
   - ✅ Estado inicial

#### **Paso 4: Interactuar con el Contrato**

```bash
# Consola conectada a Amoy
npx hardhat console --network amoy

# Conectar al contrato desplegado
> const c = await ethers.getContractAt("MiContrato", "0x742d35Cc6634C0532925a3b8D45567C6B8123456");

# Leer estado inicial
> await c.saludo()
// "Hola Polygon"

> await c.owner()
// Tu dirección

# Enviar transacción (cuesta gas real)
> const tx = await c.setSaludo("Hola desde Amoy!");
> await tx.wait();
> console.log("Hash:", tx.hash);

# Verificar cambio
> await c.saludo()
// "Hola desde Amoy!"
```

### 🎯 **¿Qué aprendiste?**

- ✅ Configuración de redes reales
- ✅ Manejo de claves privadas seguras
- ✅ Obtención de tokens de testnet
- ✅ Deploy en blockchain pública
- ✅ Verificación en exploradores
- ✅ Costos reales de gas
- ✅ Persistencia de datos en blockchain

### 🔍 **Diferencias Local vs Testnet**

| Aspecto | Local | Testnet |
|---------|-------|---------|
| **Velocidad** | Instantáneo | 2-5 segundos |
| **Costo** | Gratis | MATIC real (testnet) |
| **Persistencia** | Temporal | Permanente |
| **Explorador** | No disponible | Polygonscan |
| **Forks/Reset** | Fácil | Imposible |
| **Otros usuarios** | Solo tú | Pública |

---

## 6. Próxima Clase: Cliente Web

### 🎯 ¿Qué vamos a construir?

Una **aplicación web** que permita a los usuarios interactuar con nuestro contrato inteligente directamente desde el navegador.

### 🛠️ Tecnologías que usaremos

#### **Frontend**
- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y diseño responsivo  
- **JavaScript ES6+**: Lógica de interacción

#### **Blockchain Integration**
- **Ethers.js**: Librería para conectar con blockchain
- **MetaMask**: Provider para firmar transacciones
- **Contract ABI**: Interface para llamar funciones

#### **Funcionalidades de la App**

✨ **Características principales:**
- 🔗 Conectar/desconectar MetaMask
- 👀 Mostrar información del contrato en tiempo real
- ✏️ Cambiar saludo global
- 💬 Crear mensajes personales
- 📊 Ver estadísticas de interacciones
- 📱 Diseño responsivo para móviles

### 📋 Preparación para la Próxima Clase

#### **✅ Asegúrate de tener:**

1. **Contrato desplegado en Amoy**:
   ```bash
   # Si no lo hiciste, ejecuta:
   npm run deploy:amoy
   # Guarda la dirección del contrato
   ```

2. **MATIC en tu cuenta de prueba**:
   - Al menos 0.1 MATIC para transacciones
   - Usar faucets si es necesario

3. **MetaMask configurado**:
   - Red Amoy agregada
   - Cuenta de prueba activa

4. **Información del contrato**:
   - Dirección del contrato desplegado
   - ABI (se genera automáticamente)

#### **🎯 Conceptos que veremos:**

- **Web3 Integration**: Conectar frontend con blockchain
- **Wallet Connection**: Manejo de MetaMask
- **Transaction Handling**: Envío y confirmación de transacciones
- **Event Listening**: Escuchar eventos del contrato
- **Error Handling**: Manejo de errores de red y transacciones
- **User Experience**: Feedback visual y estados de carga

#### **💡 Estructura de la próxima clase:**

1. **Setup del proyecto frontend** (HTML/CSS/JS)
2. **Integración con Ethers.js**
3. **Conexión con MetaMask**
4. **Lectura de datos del contrato**
5. **Envío de transacciones**
6. **Manejo de eventos y estados**
7. **Deploy de la aplicación web**

---

## 7. Recursos y Referencias

### 📚 Documentación Oficial

- **Hardhat**: [hardhat.org/docs](https://hardhat.org/docs)
- **Solidity**: [docs.soliditylang.org](https://docs.soliditylang.org)
- **Ethers.js**: [docs.ethers.org](https://docs.ethers.org)
- **Polygon**: [docs.polygon.technology](https://docs.polygon.technology)

### 🔗 Enlaces Útiles

#### **Exploradores**
- [Polygonscan Amoy](https://amoy.polygonscan.com) - Testnet
- [Polygonscan](https://polygonscan.com) - Mainnet

#### **Faucets (Testnet)**
- [Polygon Faucet](https://faucet.polygon.technology/)
- [Alchemy Faucet](https://www.alchemy.com/faucets/polygon-amoy)
- [QuickNode Faucet](https://faucet.quicknode.com/polygon/amoy)

#### **Herramientas**
- [MetaMask](https://metamask.io) - Wallet
- [Remix IDE](https://remix.ethereum.org) - IDE online
- [OpenZeppelin](https://openzeppelin.com/contracts/) - Librerías seguras

### 🎯 Comandos de Referencia Rápida

```bash
# Desarrollo
npm run compile          # Compilar contratos
npm test                # Ejecutar tests
npm run test:local      # Demo completa local

# Deploy
npm run deploy:local    # Deploy en red local  
npm run deploy:amoy     # Deploy en Amoy testnet

# Interacción
npx hardhat console                    # Consola local
npx hardhat console --network amoy    # Consola Amoy
```

### 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/utn-blockchain-5k3/ejercicios_solidity_hardhat/issues)
- **Documentación UTN**: Material de la cátedra
- **Community**: Discord/Slack de la Diplomatura

---

**🎓 ¡Felicitaciones! Has completado el tutorial de Hardhat + Solidity + Polygon**

Ahora tienes las bases para desarrollar aplicaciones blockchain profesionales. En la próxima clase integraremos todo esto en una aplicación web completa.

**📝 Tarea para casa:**
1. Practica con los comandos locales
2. Despliega tu contrato en Amoy
3. Explora el contrato en Polygonscan
4. Prepara preguntas para la clase de frontend

¡Nos vemos en la próxima clase! 🚀