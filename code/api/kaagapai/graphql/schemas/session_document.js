"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  scalar Date \n  scalar UUID\n\n  enum ArchiveStatus {\n    archived\n    active\n  }\n\n  type SessionDocument {\n    sd_id: UUID!\n    file: String!\n    file_name: String!\n    content: String!\n    date_added: Date!\n    last_modified: Date\n    type: String!\n    status: ArchiveStatus!\n    session_id: UUID!\n  }\n\n  type Query { \n    sessionDocument(sd_id: UUID!): SessionDocument!\n\n    downloadSessionDocument(sd_id: UUID!): SessionDocument!\n  }\n\n  type Mutation {\n    uploadSessionDocument(file: Upload!, session_id: UUID!): SessionDocument!\n\n    editSessionDocument(sd_id: UUID!, content: String!, file_name: String!): SessionDocument!\n\n    deleteSessionDocument(sd_id: UUID!): SessionDocument!\n\n    restoreSessionDocument(sd_id: UUID!): SessionDocument!\n  }\n";