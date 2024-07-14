<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
  if (user.value) {
    navigateTo("/")
  }
})
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <h2 class="my-6 text-center text-3xl font-extrabold u-text-white">Sign in to your account</h2>
    <div class="flex justify-center">
      <button
        class="mt-3 btn btn-primary"
        @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })"
      >
        Sign in with Github
      </button>
    </div>
  </div>
</template>
<!-- <script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const email = ref("")
const router = useRouter()

// const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: "/confirm"
    }
  })
  if (error) console.log(error)
}

// watchEffect(() => {
//   if (user.value) {
//     // navigateTo("/")
//     router.push("/todo")
//   }
// })
</script>
<template>
  <div class="flex flex-col space-y-4 items-center justify-center p-6">
    <input
      v-model="email"
      type="email"
      class="form-input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Enter your email"
    />
    <button
      @click="signInWithOtp"
      class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Sign In with E-Mail
    </button>
  </div>
</template> -->
