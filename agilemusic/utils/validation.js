export function validateStringInput(input, inputName) {
    if (!input || typeof input !== 'string') {
        throw new Error(`Error: ${inputName} must be a valid string`);
    }
}

export function validateDateInput(dateString, inputName) {
    if (!dateString || Object.prototype.toString.call(new Date(dateString)) !== '[object Date]' || isNaN(new Date(dateString).getTime())) {
        throw `Error: ${inputName} must be a valid date ("YYYY-MM-DD")`;
    }
}