export const launchAlert = (alertType, alertMessage) => ({
    type: alertType,
    payload: alertMessage,
});
