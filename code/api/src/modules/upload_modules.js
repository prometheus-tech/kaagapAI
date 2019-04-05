import documentModules from './document_modules';
import path from 'path';
import textract from 'textract';

const uploadFile = async(file, session_id) => {
  const { filename, mimetype, createReadStream } = await file;

  var inputPath = './src/tmp/' + filename;
  const stream = createReadStream();
  var translation = null;
  var fileName = filename;

  documentModules.storeUpload({ stream, inputPath });
  var newFileName = documentModules.renameFile({ inputPath, session_id });

  inputPath = './src/tmp/' + newFileName;
  var filePath = 'gs://kaagapai-uploads/' + newFileName;

  if (mimetype.indexOf('audio') + 1) {
    try {
      newFileName = path.parse(newFileName).name + '.wav';
      filePath = 'gs://kaagapai-uploads/' + newFileName;
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
                  'gs://kaagapai-uploads/' + wavFile.name
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
  } else {
    try {
      let getDocumentTranslation = async () => {
        return new Promise(resolve =>
          textract.fromFileWithMimeAndPath(
            mimetype,
            inputPath,
            {
              preserveLineBreaks: true
            },
            (err, text) => {
              (async () => {
                translation = await documentModules.translateText(text);
                resolve(translation);
              })();
            }
          )
        ).catch(err => console.error(err));
      };

      documentModules.uploadGCS(inputPath);
      translation = await getDocumentTranslation();

      return { session_id, fileName, filePath, mimetype, translation };
    } catch (err) {
      console.log(err);
    }
  }
}

export default {
  uploadFile
};
