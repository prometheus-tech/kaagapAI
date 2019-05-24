"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  scalar Date\n  scalar UUID \n\n  enum ArchiveStatus {\n    archived\n    active\n  }\n\n  type Session {\n    session_id: UUID!\n    session_name: String!\n    date_of_session: Date!\n    status: ArchiveStatus!\n    c_id: UUID!\n    documents(orderByInput: OrderByInput, orderByColumn: OrderByColumn): [SessionDocument]\n    searchdocument(filter: String): [SessionDocument]\n  }\n\n  type Query { \n    session(session_id: UUID!): Session\n  }\n\n  type Mutation {\n    addSession(session_name: String!, date_of_session: Date!, c_id: UUID!): Session!\n\n    deleteSession(session_id: UUID!): Session!\n\n    restoreSession(session_id: UUID!): Session!\n\n    updateSessionInformation(session_id: UUID!, session_name: String!, date_of_session: Date!): Session!\n  }\n";