import {
  getClientSideURL,
  getServerSideURL
} from "../chunk-H25YBAVB.js";

// src/utils/canUseDom.ts
var canUseDom = () => !!(typeof window !== "undefined" && window.document && window.document.createElement);

// src/utils/getReference.ts
function getReference(ref) {
  if (typeof ref === "string") {
    return null;
  }
  return ref;
}
export {
  canUseDom,
  getClientSideURL,
  getReference,
  getServerSideURL
};
//# sourceMappingURL=index.js.map