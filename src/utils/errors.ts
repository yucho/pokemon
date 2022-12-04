import isString from "lodash/isString";

type PokemonErrorParams = {
  message: string;
  stack?: any;
};

export class PokemonError extends Error {
  constructor({ message, stack }: PokemonErrorParams) {
      super(message);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, PokemonError.prototype);

      this.stack = stack;
  }

  print() {
      return "Error: " + this.message;
  }
};

export const getMissingFieldError = (name: string, fields: string | string[]) => {
  const fieldsArray = isString(fields) ? [fields] : fields;
  const fieldString = fields.length > 1 ? 'fields' : 'field';

  return new PokemonError({ message: `${name} is missing required ${fieldString}: ${fieldsArray.join(', ')}`});
};
