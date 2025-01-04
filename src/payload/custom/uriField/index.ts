import { textField } from "@/payload/fields";
import { CollectionSlug, FieldHook } from "payload";

const updateCollectionUriField: FieldHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  // Only proceed on create or update operations
  if (operation !== "create" && operation !== "update") return;

  // Safely retrieve the collection slug and document ID
  const collection = req.routeParams?.["collection"] as
    | CollectionSlug
    | undefined;
  const id = originalDoc?.id;

  // Log and exit if required parameters are missing
  if (!collection || !id) {
    console.warn("Missing collection or document ID", { id, collection });
    return;
  }

  // Safely extract breadcrumbs and compute the new URI
  const breadcrumbs = Array.isArray(data?.breadcrumbs) ? data.breadcrumbs : [];
  const newUri =
    breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].url || "" : "";

  console.log("Computed URIs", { currentUri: data?.uri, newUri });

  // Skip the update if the URI hasn't changed
  if (data?.uri === newUri) return;

  try {
    // Update the document with the new URI
    await req.payload.update({
      collection,
      where: { id },
      data: {
        ...data,
        uri: newUri,
      },
    });
    console.info("URI updated successfully", { id, collection, newUri });
  } catch (error) {
    console.error("Failed to update URI field", { id, collection, error });
  }
};

export const uriField = () => {
  return textField({
    name: "uri",
    index: false,
    required: false,
    localized: true,
    hooks: {
      afterChange: [updateCollectionUriField],
    },
    unique: false,
    admin: {
      readOnly: false,
      position: "sidebar",
      components: {
        Field: {
          path: "@konstant/stack/payload/components#UriComponent",
        },
      },
    },
  });
};
