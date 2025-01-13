export const logger = (shouldLog = true) => {
  let indent = 0;
  const init = () => {
    setIndent(0);
  };
  const section = (title: string) => {
    if (!shouldLog) return;
    console.log("");
    console.log(title);
    console.log("----------------------------------");

    indent = 4; // Indent future logs within this section
  };

  const info = (...messages: any[]) => {
    if (!shouldLog) return;
    console.log(`${" ".repeat(indent)}`, ...messages);
  };

  const setIndent = (newIndent: number) => {
    indent = newIndent;
  };

  return {
    init,
    section,
    info,
    setIndent,
  };
};
