export function getPhoneMask(number) {
  if (!number) return;
  let masked = number.replace(/^(\d{3})(\d{3})(\d)/, '($1) $2-$3');
  return masked;
}

export function numFormating(num) {
  return ('' + num).replace(
    /(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g,
    function (m, s1, s2) {
      return s2 || s1 + ',';
    }
  );
}

export function dateFormat(date) {
  date = new Date(date);
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  return `${mo} ${da}, ${ye}`;
}
