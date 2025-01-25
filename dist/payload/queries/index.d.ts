import * as payload from 'payload';
import { SanitizedConfig, CollectionSlug } from 'payload';
import { P as PayloadQuery } from '../../types-96Og7R1r.js';

type GetDocumentByIdQuery = PayloadQuery<{
    collection: CollectionSlug;
    id: string;
}>;
declare const getDocumentById: (config: Promise<SanitizedConfig> | SanitizedConfig, params: GetDocumentByIdQuery) => Promise<(payload.JsonObject & payload.TypeWithID) | null>;

export { getDocumentById };
