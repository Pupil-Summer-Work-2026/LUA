const configuredPrivacyContactEmail = import.meta.env.VITE_PRIVACY_CONTACT_EMAIL?.trim()

if (import.meta.env.PROD && !configuredPrivacyContactEmail) {
	throw new Error('VITE_PRIVACY_CONTACT_EMAIL is required for production builds')
}

export const privacyContactEmail = configuredPrivacyContactEmail || 'privacy@example.invalid'