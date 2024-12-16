const runButton = document.getElementById("run-button");
const languageSelect = document.getElementById("language-select");

require.config({ paths: { vs: "vendor/monaco-editor/min/vs" } });
require(["vs/editor/editor.main"], function () {
  const editor = monaco.editor.create(document.getElementById("editor"), {
    value: "// Пишите код здесь...",
    language: languageSelect.value,
    theme: "vs-light",
  });

  languageSelect.addEventListener("change", (e) => {
    const language = e.target.value;
    monaco.editor.setModelLanguage(editor.getModel(), language);
    if (language === "javascript") {
      editor.setValue("// Пишите код здесь...");
    } else if (language === "python") {
      editor.setValue("# Пишите код здесь...");
    }
  });

  runButton.addEventListener("click", () => {
    const code = editor.getValue();
    const language = languageSelect.value;

    // Имитация серверной части
    const serverResponse = simulateServerResponse(code, language);

    // Обработка ответа от сервера
    serverResponse.then((response) => {
      const resultTextarea = document.getElementById("result");
      if (response.success) {
        resultTextarea.value = `Код выполнен успешно: ${response.result}`;
      } else {
        resultTextarea.value = `Ошибка при выполнении кода: ${response.error}`;
      }
    });
  });

  function simulateServerResponse(code, language) {
    // Имитация задержки на сервере
    return new Promise((resolve) => {
      setTimeout(() => {
        if (language === "javascript") {
          try {
            const result = eval(code);
            resolve({ success: true, result: result });
          } catch (error) {
            resolve({ success: false, error: error.message });
          }
        } else if (language === "python") {
          resolve({ success: true, result: "Код выполнен успешно" });
        } else {
          resolve({ success: false, error: "Не поддерживаемый язык" });
        }
      }, 1000); // Имитация задержки на сервере
    });
  }
});
