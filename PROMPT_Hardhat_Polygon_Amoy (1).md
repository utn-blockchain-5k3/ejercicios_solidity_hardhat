
# PROMPT — Proyecto Hardhat + Deploy a Polygon (Amoy testnet)

> **Cómo usarlo**: copia todo el bloque de **Prompt para Copilot** (más abajo) y pégalo en **Copilot Chat en VS Code**. El asistente deberá generar:
> - Un proyecto Hardhat listo para compilar, testear y desplegar.
> - Un contrato de ejemplo (`MiContrato.sol`).
> - Pruebas unitarias.
> - Script de deploy.
> - Configuración para **Polygon Amoy (testnet)** y **Polygon mainnet**.
> - Un `README.md` con el paso a paso para los/as estudiantes (incluido aquí).

---

## Prompt para Copilot (copiar y pegar)

Quiero que generes un **proyecto Hardhat** educativo y minimalista para que estudiantes practiquen Solidity en **Remix y VS Code** y hagan su **primer deploy en Polygon Amoy (testnet)**. Por favor crea **todo** lo siguiente en la carpeta actual del workspace:

### 1) Dependencias y configuración
- Inicializa `package.json` y agrega dependencias:
  - Dev: `hardhat`, `@nomicfoundation/hardhat-toolbox`, `dotenv`
- Crea `hardhat.config.js` con:
  - `solidity: "0.8.28"`
  - `require("@nomicfoundation/hardhat-toolbox");`
  - `require("dotenv").config();`
  - **redes**:
    ```js
    networks: {
      polygon: {
        url: "https://polygon-rpc.com",
        accounts: [process.env.PRIVATE_KEY].filter(Boolean),
      },
      amoy: {
        url: "https://rpc-amoy.polygon.technology",
        accounts: [process.env.PRIVATE_KEY].filter(Boolean),
      },
      localhost: {
        url: "http://127.0.0.1:8545"
      }
    }
    ```
  - (Opcional) `etherscan` para verificación: `polygonscan` con `apiKey: process.env.POLYGONSCAN_API_KEY`.
- Agrega **scripts** en `package.json`:
  ```json
  {
    "scripts": {
      "compile": "hardhat compile",
      "test": "hardhat test",
      "node": "hardhat node",
      "deploy:local": "hardhat run scripts/deploy.js --network localhost",
      "deploy:amoy": "hardhat run scripts/deploy.js --network amoy"
    }
  }
  ```
- Crea `.env.example` con:
  ```bash
  PRIVATE_KEY=tu_clave_privada_de_pruebas
  POLYGONSCAN_API_KEY=opcional
  ```
- Crea `.gitignore` con las entradas típicas y **que ignore `.env`**.

### 2) Contrato de ejemplo
- En `contracts/MiContrato.sol` escribe un contrato sencillo para practicar lectura/escritura:
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.28;

  contract MiContrato {
      string public saludo = "Hola Polygon";

      function setSaludo(string calldata _nuevo) external {
          saludo = _nuevo;
      }
  }
  ```

### 3) Prueba unitaria
- En `test/MiContrato.js` crea pruebas con Mocha/Chai + Ethers:
  ```javascript
  const { expect } = require("chai");

  describe("MiContrato", function () {
    it("lee y actualiza el saludo", async function () {
      const MiContrato = await ethers.getContractFactory("MiContrato");
      const contrato = await MiContrato.deploy();
      await contrato.waitForDeployment();

      expect(await contrato.saludo()).to.equal("Hola Polygon");

      const tx = await contrato.setSaludo("Hola UTN");
      await tx.wait();

      expect(await contrato.saludo()).to.equal("Hola UTN");
    });
  });
  ```

### 4) Script de deploy
- En `scripts/deploy.js`:
  ```javascript
  async function main() {
    const MiContrato = await ethers.getContractFactory("MiContrato");
    const contrato = await MiContrato.deploy();
    await contrato.waitForDeployment();

    console.log("MiContrato desplegado en:", await contrato.getAddress());
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  ```

### 5) README con paso a paso para estudiantes
Crea un `README.md` **claro y breve** con este contenido (adáptalo al repo creado):

---

# Proyecto Hardhat — UTN Blockchain (Polygon Amoy)

## Requisitos
- Node.js LTS (18+ o 20+)
- VS Code
- MetaMask (o billetera compatible) **con una cuenta SOLO de prueba**

## 1. Instalar dependencias
```bash
npm install
```

## 2. Configurar variables de entorno
- Copiar `.env.example` a `.env` y completar:
  ```bash
  PRIVATE_KEY=CLAVE_PRIVADA_DE_TU_CUENTA_DE_PRUEBAS
  POLYGONSCAN_API_KEY=opcional
  ```
> ⚠️ **Nunca** publiques tu clave privada ni la subas al repo. Usar **solo** cuentas de prueba.

## 3. Compilar y testear
```bash
npm run compile
npm test
```

## 4. Probar en red local (opcional)
En una terminal:
```bash
npm run node
```
En otra terminal:
```bash
npm run deploy:local
```

## 5. Conectarse a Polygon Amoy (testnet)
1. En MetaMask, agregar la red **Amoy** (Polygon) o seleccionar si ya existe.
   - RPC: `https://rpc-amoy.polygon.technology`
   - Chain ID: `80002`
   - Moneda nativa: `MATIC`
2. Obtener **MATIC de prueba** desde un *faucet* de Amoy.
3. Exportar la **clave privada** de esa cuenta **de pruebas** y colocarla en `.env` como `PRIVATE_KEY`.

## 6. Deploy en Amoy
```bash
npm run deploy:amoy
```
Salida esperada:
```
MiContrato desplegado en: 0x...
```
Puedes consultar el contrato en el explorador de Amoy. (Si configuraste `POLYGONSCAN_API_KEY`, también puedes verificarlo).

## 7. Interactuar desde consola
```bash
npx hardhat console --network amoy
> const c = await ethers.getContractAt("MiContrato", "DIRECCION_DEL_CONTRATO");
> (await c.saludo()).toString()
> await (await c.setSaludo("Hola Amoy")).wait();
> (await c.saludo()).toString()
```

## 8. Buenas prácticas
- No commitear `.env`.
- Usar cuentas distintas para testnet y mainnet.
- Documentar el address del contrato y tx hash en el README.

---

Genera todos los archivos indicados, instala dependencias y deja el proyecto listo para ejecutar los comandos anteriores. No inventes datos sensibles. Mantén comentarios breves en el código para que sea didáctico.

---

## Créditos y notas para docentes
- Este prompt está pensado para la **Diplomatura BC UTN**.
- La red de prueba sugerida es **Polygon Amoy** (reemplaza a Mumbai).
- Ajustar versiones si el curso requiere otra `solidity`.

