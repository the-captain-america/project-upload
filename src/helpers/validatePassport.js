function validatePassport(passport) {
  const re = /^[0-9]*$/;
  return re.test(passport);
}

export default validatePassport;
