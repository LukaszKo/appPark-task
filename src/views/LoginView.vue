<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-lg">
      <LoginForm @login-success="handleLoginSuccess" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import LoginForm from '../components/organisms/LoginForm.vue'

const router = useRouter()

function handleLoginSuccess() {
  router.push('/gate')
}
</script>
