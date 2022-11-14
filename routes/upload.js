if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const
      express = require('express')
    , router = express.Router()

    , multer = require('multer')
    , inMemoryStorage = multer.memoryStorage()
    , uploadStrategy = multer({ storage: inMemoryStorage }).single('image')

    , { AppendBlobClient } = require('@azure/storage-blob')
    //, getStream = require('into-stream')
    , containerName = process.env.AZURE_STORAGE_CONTAINER_NAME
;

const handleError = (err, res) => {
    res.status(500);
    res.render('error', { error: err });
};

const getBlobName = originalName => {
    const identifier = "CLIENTID"; // Make client identity
    return `${identifier}/${originalName}.txt`;
};

// POST upload page
router.post('/', uploadStrategy, (req, res) => {
    var str;
    const blobService1 = new AppendBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,containerName,getBlobName('Category1'));
    const blobService2 = new AppendBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,containerName,getBlobName('Category2'));
    const blobService3 = new AppendBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,containerName,getBlobName('Category3'));
    const blobService4 = new AppendBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,containerName,getBlobName('Category4'));
    const blobService5 = new AppendBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,containerName,getBlobName('Category5'));
    const blobService6 = new AppendBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,containerName,getBlobName('Category6'));
    blobService1.exists().then( (exists1) => {
        if (!exists1) {
            blobService1.create();str=req.body['category-name'][0]+'\n'+req.body['category-name'][1];
            blobService1.appendBlock(str, str.length).then(()=>{res.render('success',{message: 'File uploaded to Azure Blob storage.'});}
            ).catch((err)=>{if(err){handleError(err);return;}});
        }
        else {
            blobService2.exists().then( (exists2) => {
                if (!exists2) {
                    blobService2.create();str=req.body['category-name'][0]+'\n'+req.body['category-name'][1];
                    blobService2.appendBlock(str, str.length).then(()=>{res.render('success',{message: 'File uploaded to Azure Blob storage.'});}
                    ).catch((err)=>{if(err){handleError(err);return;}});
                }
                else {
                    blobService3.exists().then( (exists3) => {
                        if (!exists3) {
                            blobService3.create();str=req.body['category-name'][0]+'\n'+req.body['category-name'][1];
                            blobService3.appendBlock(str, str.length).then(()=>{res.render('success',{message: 'File uploaded to Azure Blob storage.'});}
                            ).catch((err)=>{if(err){handleError(err);return;}});
                        }
                        else {
                            blobService4.exists().then( (exists4) => {
                                if (!exists4) {
                                    blobService4.create();str=req.body['category-name'][0]+'\n'+req.body['category-name'][1];
                                    blobService4.appendBlock(str, str.length).then(()=>{res.render('success',{message: 'File uploaded to Azure Blob storage.'});}
                                    ).catch((err)=>{if(err){handleError(err);return;}});
                                }
                                else {
                                    blobService5.exists().then( (exists5) => {
                                        if (!exists5) {
                                            blobService5.create();str=req.body['category-name'][0]+'\n'+req.body['category-name'][1];
                                            blobService5.appendBlock(str, str.length).then(()=>{res.render('success',{message: 'File uploaded to Azure Blob storage.'});}
                                            ).catch((err)=>{if(err){handleError(err);return;}});
                                        }
                                        else {
                                            blobService6.exists().then( (exists6) => {
                                                if (!exists6) {
                                                    blobService6.create();str=req.body['category-name'][0]+'\n'+req.body['category-name'][1];
                                                    blobService6.appendBlock(str, str.length).then(()=>{res.render('success',{message: 'File uploaded to Azure Blob storage.'});}
                                                    ).catch((err)=>{if(err){handleError(err);return;}});
                                                }
                                                else {
                                                    res.render('success',{message: 'Maximum category upload already reached.'});
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

module.exports = router;