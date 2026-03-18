/**
 * Changes innerhtml text based on data
 * * @param {Object} data - The main data container.
 * @param {Object} data.name - The name of the section to change language.
 * @param {HTMLElement[]} data.name.elements - all elements the section
 * @param {Object} data.name.data - Json object used by the section
 * * @param {String} language - Locale notation of language e.g EN
 */
export function changeLanguage(data, language) {
    Object.entries(data).forEach(([key, { elements, data }]) => {
        setTextLanguage(language, elements, data);
    });
}

export function setTextLanguage(language, elements, data) {
    elements.forEach((obj) => {
        let isPlaceholder = false;
        const path = obj.dataset.i18n;
        const textValue = String(path)
            .split(".")
            .reduce((prev, next) => {
                isPlaceholder = next.toLowerCase().includes("placeholder");
                return prev[next];
            }, data[language]);

        if (isPlaceholder) {
            obj.setAttribute("placeholder", textValue);
        } else {
            obj.innerHTML = textValue;
        }
    });
}
