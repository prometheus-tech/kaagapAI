import documentModules from './document_modules';
import path from 'path';

const uploadFile = async(file, session_id) => {
  const { filename, mimetype, createReadStream } = await file;

  var inputPath = './src/tmp/' + filename;
  const stream = createReadStream();
  var translation = null;
  var fileName = filename;

  await documentModules.storeUpload({ stream, inputPath });
  var newFileName = await documentModules.renameFile({ inputPath, session_id });

  var filePath = 'gs://kaagapai-files/' + newFileName;

  if (mimetype.indexOf('wave') + 1) {
    inputPath = './src/tmp/' + newFileName;
    filePath = 'gs://kaagapai-files/' + newFileName;

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
      inputPath = './src/tmp/' + newFileName;
      newFileName = path.parse(newFileName).name + '.wav';
      filePath = 'gs://kaagapai-files/' + newFileName;
      const params = {
        inputPath: inputPath,
        outputPath: './src/tmp/' + newFileName
      };

      let getAudioTranslation = async params => {
        return new Promise(resolve =>
          documentModules
            .convert(params.inputPath, params.outputPath)
            .then(wavFile => {
              (async () => {
                const transcription = await documentModules.extractText(
                  'gs://kaagapai-files/' + wavFile.name
                );
                translation = await documentModules.translateText(transcription
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
    inputPath = './src/tmp/' + newFileName;
    const imageTranscript = await documentModules.extractImageText(inputPath);
    
    if(imageTranscript) {
      translation = await documentModules.translateText(imageTranscript);
    } else {
      translation = null;
    }

    await documentModules.uploadGCS(inputPath);

    return { session_id, fileName, filePath, mimetype, translation };
  } else {
    inputPath = './src/tmp/' + newFileName;
    const transcript = await documentModules.extractDocumentText(inputPath);
    translation = await documentModules.translateText(transcript);
    await documentModules.uploadGCS(inputPath);

    return { session_id, fileName, filePath, mimetype, translation };
  }
}

const uploadAttachment = async(file, session_id) => {
  const { filename, mimetype, createReadStream } = await file;

  var inputPath = './src/tmp/' + filename;
  const stream = createReadStream();
  var fileName = filename;

  await documentModules.storeUpload({ stream, inputPath });
  var newFileName = await documentModules.renameFile({ inputPath, session_id });

  var filePath = 'gs://kaagapai-files/' + newFileName;

  await documentModules.uploadGCS(inputPath);

  return { session_id, fileName, filePath, mimetype };
}

export default {
  uploadFile
};
