export const routes = {
  auth: {
    baseUrl: '/api/auth',
    register: '/register',
    login: '/login',
    logout: '/logout',
    profile: '/getProfile',
    refresh: '/refresh',
    google: '/googleAuth',
    twitter: '/twitterAuth',
    social: '/socialAuth',
  },
  users: {
    baseUrl: '/users',
  },
  user: {
    baseUrl: '/user',

  },
  review: {
    baseUrl: '/reviews',
    random: '/random',
    latest: '/latest',
    userReviews: '/userReviews',
    new: '/new',
    like: '/like',
    score: '/score',
    image: '/image',
  },
  tags: {
    baseUrl: '/tags',
  }
}