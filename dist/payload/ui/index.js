// src/payload/ui/getReference.ts
function getReference(value) {
  const isResolved = typeof value !== "string";
  return isResolved ? value : null;
}

// src/payload/ui/getRelation.ts
var getRelation = (props) => {
  const { relationTo, value } = props;
  const getValue = () => getReference(value);
  const fetch = async (query) => {
    return await query({
      id: value,
      collection: relationTo
    });
  };
  const getOrFetchValue = async (query) => {
    const resolvedValue = getValue();
    if (resolvedValue !== null) {
      return resolvedValue;
    }
    const result = fetch(query);
    return result;
  };
  return {
    getOrFetchValue,
    getValue,
    relationTo
  };
};
export {
  getReference,
  getRelation
};
//# sourceMappingURL=index.js.map