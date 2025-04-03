// src/payload/ui/getReference.ts
function getReference(value) {
  const isResolved = typeof value !== "string";
  return isResolved ? value : null;
}

// src/payload/ui/getRelation.ts
var getRelation = (props) => {
  const { relationTo, value } = props;
  const getValue = () => getReference(value);
  const getOrFetchValue = async (queryCb) => {
    const resolvedValue = getValue();
    if (resolvedValue !== null) {
      return resolvedValue;
    }
    try {
      const result = await queryCb({
        id: value,
        collection: relationTo
      });
      return result;
    } catch (e) {
      console.error(e);
      return null;
    }
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