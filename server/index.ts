const users = [
  {
    name: 'Andrei',
    age: '39',
    email: 'andres@gmail.com',
    password: 'pass',
  },

  {
    name: 'Katya',
    age: '18',
    email: 'katya@gmail.com',
    password: 'another-pass',
  },
]

Bun.serve({
  port: 3333,
  static: {
    '/': new Response(await Bun.file('./index.html').bytes(), {
      headers: {
        'Content-Type': 'text/html',
      },
    }),
  },
  async fetch(req) {
    const url = new URL(req.url)
    if (url.pathname === '/login' && req.method === 'GET') {
      const email = url.searchParams.get('email')
      const password = url.searchParams.get('password')

      const user = users.find(
        (u) => u.email === email && u.password === password
      )
      if (!user) {
        return new Response(await Bun.file('./login-incorrect.html').bytes(), {
          headers: {
            'Content-Type': 'text/html',
          },
        })
      }
      const file = await Bun.file('./dashboard.html').text()
      return new Response(
        file
          .replaceAll('{{username}}', user.name)
          .replaceAll('{{age}}', user.age),
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      )
    }
    if (url.pathname === '/blog') return new Response('Blog!')
    return new Response('404!')
  },
})
