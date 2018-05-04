export function checkAuth() {
    let token = localStorage.getItem('token');
    if(!token) return;
    return token;
}
