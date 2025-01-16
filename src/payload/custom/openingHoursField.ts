import { capitalize } from "@/utils/string";
import {
  arrayField,
  checkboxField,
  dateField,
  groupField,
  rowField,
  selectField,
  textField,
} from "../fields";
import { createField } from "@/payload/utils/createField";
import { timeField } from "./timeField";

export const weekdaysMap: Record<string, string> = {
  1: "Mondays",
  2: "Tuesdays",
  3: "Wednesdays",
  4: "Thursdays",
  5: "Fridays",
  6: "Saturdays",
  7: "Sundays",
};

const dayOptions = Object.keys(weekdaysMap).map((key) => ({
  label: weekdaysMap[key] || "",
  value: key,
}));

export const openingHoursField = createField((props) => {
  const items = arrayField({
    name: "items",
    label: "Opening Hours",
    fields: [
      selectField({
        name: "days",
        hasMany: true,
        required: true,
        localized: false,
        defaultValue: [],
        options: dayOptions,
      }),
      textField({ name: "label", required: true, localized: true }),
      ...timeFields(),
    ],
  });

  const customOpeningHours = arrayField({
    name: "custom",
    label: "Custom Opening Hours",
    fields: [
      textField({ name: "label", required: true, localized: true }),
      dateField({
        name: "date",
        label: "Date",
        required: true,
        localized: false,
        admin: {
          date: {
            pickerAppearance: "dayOnly",
            displayFormat: "d MMM yyy",
          },
        },
      }),
      ...timeFields(),
    ],
  });

  return groupField({
    name: "openingHours",
    interfaceName: "OpeningHours",
    fields: [items, customOpeningHours],
  });
});

const timeFields = () => {
  return [
    rowField({
      admin: {
        condition: (_, siblingData) => !siblingData.isClosed,
      },
      fields: ["openingTime", "closingTime"].map((name) =>
        timeField({ name, label: capitalize(name) }),
      ),
    }),
    checkboxField({ name: "isClosed", label: "Closed whole day" }),
    textField({
      name: "closedLabel",
      admin: { condition: (_, siblingData) => siblingData.isClosed },
    }),
  ];
};
