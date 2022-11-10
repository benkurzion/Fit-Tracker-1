//helpful links
//https://learn.microsoft.com/en-us/azure/app-service/tutorial-connect-app-access-storage-javascript?tabs=azure-portal
//https://github.com/Azure-Samples/ms-identity-easyauth-nodejs-storage-graphapi/blob/main/1-WebApp-storage-managed-identity/utils/storageHelper.js


//const { DefaultAzureCredential } = require('../node_modules/@azure/identity');
//const { BlobServiceClient } = require('../node_modules/@azure/storage-blob');
import { InteractiveBrowserCredential } from '../node_modules/@azure/identity';
import { BlobServiceClient } from '../node_modules/@azure/storage-blob';

const interactiveBrowserCredential = new InteractiveBrowserCredential(
    {clientId: "216761648543-kabnqh2crabg0h8e1seelj1evdjbjjll.apps.googleusercontent.com"}
);

async function getBlobs(accountName, containerName) {
    const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        interactiveBrowserCredential
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    try {
        await containerClient.createIfNotExists();

        let blobs = containerClient.listBlobsFlat();
        let downloadedList = {};

        for await (const blob of blobs) {
            console.log(`${blob.name}`);

            const blobClient = containerClient.getBlobClient(blob.name);

            // Get blob content from position 0 to the end
            // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
            const downloadBlockBlobResponse = await blobClient.download();

            const downloaded = (
                await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
            ).toString();

            console.log("Downloaded blob content:", downloaded);

            if (downloadedList[blob.name]) {
                downloadedList[blob.name].push(downloaded);
            } else {
                downloadedList = {
                    ...downloadedList,
                    [blob.name]: [downloaded]
                }
            }
        }

        return downloadedList;
    } catch (error) {
        console.log(error);
    }
}

async function deleteBlob(accountName, containerName, blobName) {
    const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        interactiveBrowserCredential
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    try {
        await blobClient.deleteIfExists();
    } catch (error) {
        console.log(error);
    }
}

async function uploadBlob(accountName, containerName, blobName, blobContents) {
    const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        interactiveBrowserCredential
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    try {
        await containerClient.createIfNotExists();
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(blobContents, blobContents.length);
        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    } catch (error) {
        console.log(error);
    }
}

// A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
    });
}

/*
module.exports = {
    getBlobs,
    deleteBlob,
    uploadBlob
};
*/