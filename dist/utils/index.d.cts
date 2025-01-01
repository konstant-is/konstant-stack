declare const canUseDom: () => boolean;

declare const getServerSideURL: () => string;
declare const getClientSideURL: () => string;

declare function getReference<T>(ref: T | string | null | undefined): T | null;

export { canUseDom, getClientSideURL, getReference, getServerSideURL };
