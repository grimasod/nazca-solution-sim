export default function ({ $axios, app }) {
  $axios.onError(async error => error.response && [401, 403].includes(error.response.status) ? await app.$auth.logout() : null)
}
