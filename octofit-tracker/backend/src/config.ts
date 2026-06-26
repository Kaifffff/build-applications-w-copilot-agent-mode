const codespaceName = process.env.CODESPACE_NAME;

export const getApiBaseUrl = (): string => {
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
};
