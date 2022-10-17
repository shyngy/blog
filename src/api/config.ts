export default {
  url: 'https://blog.kata.academy/api',
};
export function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  if (match) return match[2];
}
