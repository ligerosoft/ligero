type Modifier = string | Record<string, any>;
type Modifiers = Modifier | Modifier[];

function generate(el: string, mode?: Modifiers): string {
  if (!mode) return '';
  if (typeof mode === 'string') {
    return ` ${el}--${mode}`;
  }
  if (Array.isArray(mode)) {
    return mode.reduce<string>((prev, next) => prev + generate(el, next), '');
  }
  return Object.keys(mode).reduce(
    (prev, next) => prev + (mode[next] ? generate(el, next) : ''),
    '',
  );
}

export function createBem(prefix: string) {
  return (el?: Modifiers, mode?: Modifiers) => {
    if (el && typeof el !== 'string') {
      mode = el;
      el = '';
    }
    el = el ? `${prefix}__${el}` : prefix;
    return `${el}${generate(el, mode)}`;
  };
}
