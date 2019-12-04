const documentModules = require('./document_modules');
const path = require('path');

const uploadFile = async (file, session_id) => {
  const { filename, mimetype, createReadStream } = await file;

  var inputPath = './tmp/' + filename;
  const stream = createReadStream();
  var translation = null;
  var fileName = filename;

  console.log('Uploading...');
  await documentModules.storeUpload({ stream, inputPath });
  console.log('Uploaded');

  var newFileName = await documentModules.renameFile({ inputPath, session_id });

  var filePath = 'gs://kaagapai2019/' + newFileName;

  if (mimetype.indexOf('wave') + 1) {
    inputPath = './tmp/' + newFileName;
    filePath = 'gs://kaagapai2019/' + newFileName;

    await documentModules.uploadGCS(inputPath);

    let getAudioTranslation = () => {
      return new Promise(async resolve => {
        const transcription = await documentModules.extractText(filePath);
        translation = await documentModules.translateText(transcription);
        resolve(translation);
      });
    };

    translation = await getAudioTranslation();

    return { session_id, fileName, filePath, mimetype, translation };
  } else if (mimetype.indexOf('audio') + 1) {
    try {
      inputPath = './tmp/' + newFileName;
      newFileName = path.parse(newFileName).name + '.wav';
      filePath = 'gs://kaagapai2019/' + newFileName;
      const params = {
        inputPath: inputPath,
        outputPath: './tmp/' + newFileName
      };

      let getAudioTranslation = async params => {
        return new Promise(resolve =>
          documentModules
            .convert(params.inputPath, params.outputPath)
            .then(wavFile => {
              (async () => {
                const transcription = await documentModules.extractText(
                  'gs://kaagapai2019/' + wavFile.name
                );
                translation = await documentModules.translateText(
                  transcription
                );
                resolve(translation);
              })();
            })
        );
      };

      translation = await getAudioTranslation(params);
      return { session_id, fileName, filePath, mimetype, translation };
    } catch (err) {
      console.log(err);
    }
  } else if (mimetype.indexOf('image') + 1) {
    inputPath = './tmp/' + newFileName;
    const imageTranscript = await documentModules.extractImageText(inputPath);

    if (imageTranscript) {
      translation = await documentModules.translateText(imageTranscript);
    } else {
      translation = null;
    }

    await documentModules.uploadGCS(inputPath);

    return { session_id, fileName, filePath, mimetype, translation };
  } else {
    inputPath = './tmp/' + newFileName;
    const transcript = await documentModules.extractDocumentText(inputPath);
    translation = await documentModules.translateText(transcript);
    await documentModules.uploadGCS(inputPath);

    return { session_id, fileName, filePath, mimetype, translation };
  }
};

const uploadAttachment = async (file, session_id) => {
  const { filename, mimetype, createReadStream } = await file;

  var inputPath = './tmp/' + filename;
  const stream = createReadStream();
  var fileName = filename;

  await documentModules.storeUpload({ stream, inputPath });
  var newFileName = await documentModules.renameFile({ inputPath, session_id });

  var filePath = 'gs://kaagapai2019/' + newFileName;
  inputPath = './tmp/' + newFileName;

  await documentModules.uploadGCS(inputPath);

  return { session_id, fileName, filePath, mimetype };
};

module.exports = {
  uploadFile,
  uploadAttachment
};