const nameErros = (field, errors) => {
  return errors.map((error) => (error.includes(field) ? field : ""));
};

const errorField = (field, errors) => {
  let name_error = nameErros(field, errors);
  return name_error.find((error) => error === field);
};

export default errorField;
