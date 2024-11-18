function saveToken(token: string) {
  localStorage.setItem('token', token);
}

function getToken(): string | null {
  return localStorage.getItem('token');
}

function deleteToken() {
  localStorage.removeItem('token');
}