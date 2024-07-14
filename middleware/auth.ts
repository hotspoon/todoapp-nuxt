export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  if (!user.value) {
    return navigateTo("/login")
  }
})
