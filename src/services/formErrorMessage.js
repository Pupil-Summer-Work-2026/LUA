// Pārveido API kļūdu par lietotājam saprotamu, tulkotu formas paziņojumu.
export function getFormErrorMessage(error, t) {
  if (error.status === 429) return t('formErrors.rateLimited')
  if (error.status === 400 && error.errors?.turnstile) return t('formErrors.captcha')
  if (error.status === 400) return t('formErrors.invalidFields')
  if (error.status >= 500) return t('formErrors.server')
  if (!error.status) return t('formErrors.network')

  return t('formErrors.unknown')
}