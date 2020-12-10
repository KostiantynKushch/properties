export function getPhoneMask(number) {
  if (!number) return;
  let masked = number.replace(/^(\d{3})(\d{3})(\d)/, '($1) $2-$3');
  return masked;
}
