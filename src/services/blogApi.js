const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`)
    error.status = response.status
    throw error
  }

  return response.json()
}

export function getPosts() {
  return request('/posts/')
}

export function getPost(postId) {
  return request(`/posts/${postId}/`)
}

export function getTags() {
  return request('/tags/')
}