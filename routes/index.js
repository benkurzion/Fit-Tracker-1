if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const
      express = require('express')
    , router = express.Router()
    , { BlobServiceClient } = require("@azure/storage-blob")
    , blobServiceClient = BlobServiceClient.fromConnectionString('DefaultEndpointsProtocol=https;AccountName=localfittrack;AccountKey=LDUw2jHirnMseOswuFitVVVRrjKCj4+y0cqL8kdhLGXOhZjvOADJ7ldDI/lr6t4h08i5Ah7sS8xo+ASt2NTqEg==;EndpointSuffix=core.windows.net')
    , containerName = 'localfit'
    , config = require('../config')
;

router.get('/', async(req, res, next) => {
  let viewData;
  try{
      const blobs = new BlobContainerClient("UseDevelopmentStorage=true", "localfit").listBlobsFlat();
      viewData = {
        title: 'Home',
        viewName: 'index',
        accountName: config.getStorageAccountName(),
        containerName: containerName,
        thumbnails:[]
      };
      for await(let blob of blobs){
          viewData.thumbnails.push(blob);
      }
    
    }catch(err){
      viewData = {
          title: 'Error',
          viewName: 'error',
          message: 'There was an error contacting the blob storage container.',
          error: err
        };
        
        res.status(500);
    }
  res.render(viewData.viewName, viewData);
});



module.exports = router;
