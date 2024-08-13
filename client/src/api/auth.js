
export async function registerRequest (user) {
  return await fetch(`${import.meta.env.VITE_API}/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body:  JSON.stringify(user)
  });
}



export async function loginRequest (user) {
  return await fetch(`${import.meta.env.VITE_API}/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body:  JSON.stringify(user)
  });
}

export async function verifyTokenRequest () {
  return await fetch(`${import.meta.env.VITE_API}/verify`, {
    credentials: 'include'
  })
}

export async function logoutRequest () {
  return await fetch(`${import.meta.env.VITE_API}/logout`, {
    method: "POST",
    credentials: 'include'
  })
}