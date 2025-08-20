<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
    <div class="text-center mb-8">
      <BaseText tag="h1" variant="heading-lg" color="navy"> Logowanie </BaseText>
      <BaseText variant="caption" class="mt-2"> Wprowadź swoje dane aby się zalogować </BaseText>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <BaseInput
        v-model="email"
        type="email"
        label="Email"
        placeholder="Wprowadź swój email"
        :error="emailError"
        @blur="validateEmail"
      />

      <BaseInput
        v-model="password"
        type="password"
        label="Hasło"
        placeholder="Wprowadź swoje hasło"
        :error="passwordError"
        @blur="validatePassword"
      />

      <div v-if="authError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-center">
          <AlertCircle class="w-5 h-5 text-red-500 mr-2" />
          <BaseText variant="body" class="text-red-700">
            {{ authError.message }}
          </BaseText>
        </div>
      </div>

      <BaseButton
        variant="primary"
        :disabled="isLoading || !isFormValid"
        @click="handleSubmit"
        class="w-full relative mt-10"
      >
        <span v-if="isLoading" class="flex items-center justify-center">
          <Loader class="w-5 h-5 text-white mr-2 animate-spin" />
          Logowanie...
        </span>
        <span v-else>Zaloguj się</span>
      </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { AlertCircle, Loader } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import BaseText from '@/components/atoms/BaseText.vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

const emit = defineEmits<{
  loginSuccess: []
}>()

const { loginUser, isLoading, error: authError, clearError } = useAuth()

const email = ref('tester@parkapp.pl')
const password = ref('123$TesT$321')
const emailError = ref('')
const passwordError = ref('')

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    emailError.value = 'Email jest wymagany'
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Wprowadź prawidłowy adres email'
  } else {
    emailError.value = ''
  }
}

function validatePassword() {
  if (!password.value) {
    passwordError.value = 'Hasło jest wymagane'
  } else if (password.value.length < 6) {
    passwordError.value = 'Hasło musi mieć co najmniej 6 znaków'
  } else {
    passwordError.value = ''
  }
}

const isFormValid = computed(() => {
  return (
    email.value &&
    password.value &&
    !emailError.value &&
    !passwordError.value &&
    email.value.includes('@') &&
    password.value.length >= 6
  )
})

watch([email, password], () => {
  if (authError.value) {
    clearError()
  }
})

async function handleSubmit() {
  validateEmail()
  validatePassword()

  if (!isFormValid.value) {
    return
  }

  const success = await loginUser(email.value, password.value)

  if (success) {
    emit('loginSuccess')
  }
}
</script>
