const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

// Nosūta API pieprasījumu, pārbauda atbildi un izveido vienotu kļūdas objektu neveiksmes gadījumā.
async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)
  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    const error = new Error(data?.message || `Request failed with status ${response.status}`)
    error.status = response.status
    error.correlationId = data?.correlationId
    error.errors = data?.errors
    error.retryAfter = response.headers.get('retry-after')
    throw error
  }

  if (data === null) {
    throw new Error('The API returned an invalid response.')
  }

  return data
}

// Iegūst publicēto jaunumu sarakstu.
export function getPosts(options) {
  return request('/posts/', options)
}

// Iegūst vienu jaunumu pēc tā identifikatora.
export function getPost(postId) {
  return request(`/posts/${postId}/`)
}

// Iegūst jaunumu kategoriju sarakstu.
export function getTags() {
  return request('/tags/')
}

// Iegūst asociācijas biedru sarakstu.
export function getMembers(options) {
  return request('/members/', options)
}

// Iegūst asociācijas goda biedru sarakstu.
export function getHonorableMembers(options) {
  return request('/honorable-members/', options)
}

// Nosūta formas datus uz norādīto API adresi.
export function submitForm(path, formData) {
  return request(path, { method: 'POST', body: formData })
}