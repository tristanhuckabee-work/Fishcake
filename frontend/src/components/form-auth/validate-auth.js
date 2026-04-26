export function validateFE(type, data) {
  const errors = {};
  if (type == 'L') {
    const key = ["email", "password"];

    data.forEach((el, i) => {
      if (el.length == 0) errors[key[i]] = "required";
    })
  } else {
    const key = ["email", "firstName", "lastName", "password", "confirm"];
    
    data.forEach((el, i) => {
      if (i == 4 && data[4] != data[3]) errors[key[i]] = "passwords do not match"; 
      if (el.length == 0) errors[key[i]] = "required";
    })
  }

  return errors;
}