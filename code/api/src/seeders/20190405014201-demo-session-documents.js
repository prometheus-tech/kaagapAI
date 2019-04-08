'use strict';
// const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Session_Documents', [
      {
        sd_id: 'dc02cdcd-8d5b-4bc1-a4fc-131789e6d5ba',
        file: 'gs://kaagapai-uploads/02e91df5-f35b-4cad-9d72-73c8bc2edd99-WoGj1NmEX.pdf',
        file_name: 'fil.pdf',
        content: 'a DOH record, has reached 93 deaths from leptospirosis from January 1 to June 9 this year. The number of deaths due to kidney failure caused by leptospirosis in the National Kidney and Transplant Institute (NKTI) was not included in this week.Today, NKTI has been confined to 33 in Quezon City due to this dangerous disease.From the same time, the DOH has recorded a total of 1,030 cases of leptospirosis. It increased 41 percent compared to last years record. Most affected by the disease are males and mostly from Western Visayas, Caraga and Davao Region.Leptospirosis is a type of bacterial infection from the urine of an infected animal like a rat. The bacteria is transmitted to humans by flood or food or drinking water contaminated with bacteria.Symptoms of this disease include high fever, muscle aches, eye ulcer, tremors, severe headaches, vomiting, diarrhea, and jaundice. If not prone, it can cause',
        date_added: new Date(),
        last_modified: '',
        type: 'application/pdf',
        archive_status: 'existing',
        session_id: '02e91df5-f35b-4cad-9d72-73c8bc2edd99'
      },
      {
        sd_id: 'ff79bd79-2bfa-4ca6-9c60-42453edf3480',
        file: 'gs://kaagapai-uploads/02e91df5-f35b-4cad-9d72-73c8bc2edd99-68_ZKbfhT.txt',
        file_name: 'fil.txt',
        content: 'a DOH record, has reached 93 deaths from leptospirosis from January 1 to June 9 this year. The number of deaths due to kidney failure caused by leptospirosis in the National Kidney and Transplant Institute (NKTI) was not included in this week.Today, NKTI has been confined to 33 in Quezon City due to this dangerous disease.From the same time, the DOH has recorded a total of 1,030 cases of leptospirosis. It increased 41 percent compared to last years record. Most affected by the disease are males and mostly from Western Visayas, Caraga and Davao Region.Leptospirosis is a type of bacterial infection from the urine of an infected animal like a rat. The bacteria is transmitted to humans by flood or food or drinking water contaminated with bacteria.Symptoms of this disease include high fever, muscle aches, eye ulcer, tremors, severe headaches, vomiting, diarrhea, and jaundice. If not prone, it can cause',
        date_added: new Date(),
        last_modified: '',
        type: 'text/plain',
        archive_status: 'existing',
        session_id: '16cce96d-f9a3-49b0-9108-3da67ccfa32c'
      },
      {
        sd_id: '96834f38-fa82-4aae-915d-9eb266efb6b7',
        file: 'gs://kaagapai-uploads/02e91df5-f35b-4cad-9d72-73c8bc2edd99-GZk2uoXAN.wav',
        file_name: 'test.wav',
        content: 'a DOH record, has reached 93 deaths from leptospirosis from January 1 to June 9 this year. The number of deaths due to kidney failure caused by leptospirosis in the National Kidney and Transplant Institute (NKTI) was not included in this week.Today, NKTI has been confined to 33 in Quezon City due to this dangerous disease.From the same time, the DOH has recorded a total of 1,030 cases of leptospirosis. It increased 41 percent compared to last years record. Most affected by the disease are males and mostly from Western Visayas, Caraga and Davao Region.Leptospirosis is a type of bacterial infection from the urine of an infected animal like a rat. The bacteria is transmitted to humans by flood or food or drinking water contaminated with bacteria.Symptoms of this disease include high fever, muscle aches, eye ulcer, tremors, severe headaches, vomiting, diarrhea, and jaundice. If not prone, it can cause',
        date_added: new Date(),
        last_modified: '',
        type: 'audio/wave',
        archive_status: 'existing',
        session_id: '16cce96d-f9a3-49b0-9108-3da67ccfa32c'
      },
      {
        sd_id: 'adc7edee-f236-43f7-8367-e27f63308525',
        file: 'gs://kaagapai-uploads/02e91df5-f35b-4cad-9d72-73c8bc2edd99-y2MbnTugB.docx',
        file_name: 'fil.docx',
        content: 'a DOH record, has reached 93 deaths from leptospirosis from January 1 to June 9 this year. The number of deaths due to kidney failure caused by leptospirosis in the National Kidney and Transplant Institute (NKTI) was not included in this week.Today, NKTI has been confined to 33 in Quezon City due to this dangerous disease.From the same time, the DOH has recorded a total of 1,030 cases of leptospirosis. It increased 41 percent compared to last years record. Most affected by the disease are males and mostly from Western Visayas, Caraga and Davao Region.Leptospirosis is a type of bacterial infection from the urine of an infected animal like a rat. The bacteria is transmitted to humans by flood or food or drinking water contaminated with bacteria.Symptoms of this disease include high fever, muscle aches, eye ulcer, tremors, severe headaches, vomiting, diarrhea, and jaundice. If not prone, it can cause',
        date_added: new Date(),
        last_modified: '',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        archive_status: 'existing',
        session_id: '02e91df5-f35b-4cad-9d72-73c8bc2edd99'
      },
      {
        sd_id: 'b953047b-3c26-4050-82e5-e73a3c918653',
        file: 'gs://kaagapai-uploads/02e91df5-f35b-4cad-9d72-73c8bc2edd99-wNA-87XM-.wav',
        file_name: 'Leading Women Alex Gonzaga (1).m4a',
        content: 'appreciating family I saw them that theyre very supportive they go out',
        date_added: new Date(),
        last_modified: '',
        type: 'audio/mp4',
        archive_status: 'existing',
        session_id: '02e91df5-f35b-4cad-9d72-73c8bc2edd99'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Session_Documents', null, {});
  }
};
