/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '../node_modules/@azure/identity'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '../node_modules/@azure/storage-blob'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* module decorator */ module = __webpack_require__.hmd(module);\n//helpful links\r\n//https://learn.microsoft.com/en-us/azure/app-service/tutorial-connect-app-access-storage-javascript?tabs=azure-portal\r\n//https://github.com/Azure-Samples/ms-identity-easyauth-nodejs-storage-graphapi/blob/main/1-WebApp-storage-managed-identity/utils/storageHelper.js\r\n\r\n\r\n//const { DefaultAzureCredential } = require('../node_modules/@azure/identity');\r\n//const { BlobServiceClient } = require('../node_modules/@azure/storage-blob');\r\n\r\n\r\n\r\nconst interactiveBrowserCredential = new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '../node_modules/@azure/identity'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(\r\n    {clientId: \"216761648543-kabnqh2crabg0h8e1seelj1evdjbjjll.apps.googleusercontent.com\"}\r\n);\r\n\r\nasync function getBlobs(accountName, containerName) {\r\n    const blobServiceClient = new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '../node_modules/@azure/storage-blob'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(\r\n        `https://${accountName}.blob.core.windows.net`,\r\n        interactiveBrowserCredential\r\n    );\r\n\r\n    const containerClient = blobServiceClient.getContainerClient(containerName);\r\n\r\n    try {\r\n        await containerClient.createIfNotExists();\r\n\r\n        let blobs = containerClient.listBlobsFlat();\r\n        let downloadedList = {};\r\n\r\n        for await (const blob of blobs) {\r\n            console.log(`${blob.name}`);\r\n\r\n            const blobClient = containerClient.getBlobClient(blob.name);\r\n\r\n            // Get blob content from position 0 to the end\r\n            // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody\r\n            const downloadBlockBlobResponse = await blobClient.download();\r\n\r\n            const downloaded = (\r\n                await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)\r\n            ).toString();\r\n\r\n            console.log(\"Downloaded blob content:\", downloaded);\r\n\r\n            if (downloadedList[blob.name]) {\r\n                downloadedList[blob.name].push(downloaded);\r\n            } else {\r\n                downloadedList = {\r\n                    ...downloadedList,\r\n                    [blob.name]: [downloaded]\r\n                }\r\n            }\r\n        }\r\n\r\n        return downloadedList;\r\n    } catch (error) {\r\n        console.log(error);\r\n    }\r\n}\r\n\r\nasync function deleteBlob(accountName, containerName, blobName) {\r\n    const blobServiceClient = new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '../node_modules/@azure/storage-blob'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(\r\n        `https://${accountName}.blob.core.windows.net`,\r\n        interactiveBrowserCredential\r\n    );\r\n\r\n    const containerClient = blobServiceClient.getContainerClient(containerName);\r\n    const blobClient = containerClient.getBlobClient(blobName);\r\n\r\n    try {\r\n        await blobClient.deleteIfExists();\r\n    } catch (error) {\r\n        console.log(error);\r\n    }\r\n}\r\n\r\nasync function uploadBlob(accountName, containerName, blobName, blobContents) {\r\n    const blobServiceClient = new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '../node_modules/@azure/storage-blob'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(\r\n        `https://${accountName}.blob.core.windows.net`,\r\n        interactiveBrowserCredential\r\n    );\r\n\r\n    const containerClient = blobServiceClient.getContainerClient(containerName);\r\n\r\n    try {\r\n        await containerClient.createIfNotExists();\r\n        const blockBlobClient = containerClient.getBlockBlobClient(blobName);\r\n        const uploadBlobResponse = await blockBlobClient.upload(blobContents, blobContents.length);\r\n        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);\r\n    } catch (error) {\r\n        console.log(error);\r\n    }\r\n}\r\n\r\n// A helper method used to read a Node.js readable stream into a Buffer\r\nasync function streamToBuffer(readableStream) {\r\n    return new Promise((resolve, reject) => {\r\n        const chunks = [];\r\n        readableStream.on(\"data\", (data) => {\r\n            chunks.push(data instanceof Buffer ? data : Buffer.from(data));\r\n        });\r\n        readableStream.on(\"end\", () => {\r\n            resolve(Buffer.concat(chunks));\r\n        });\r\n        readableStream.on(\"error\", reject);\r\n    });\r\n}\r\n\r\nmodule.exports = {\r\n    getBlobs,\r\n    deleteBlob,\r\n    uploadBlob\r\n};\n\n//# sourceURL=webpack://myexpressapp/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;