<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <input
      v-model="modelValue"
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :class="[
        'w-full px-4 py-3 border rounded-lg transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400',
      ]"
      @blur="$emit('blur')"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'text' | 'email' | 'password'
  label?: string
  placeholder?: string
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const modelValue = defineModel<string>({ default: '' })

const hasError = computed(() => !!props.error)

const inputId = computed(() => {
  return `input-${Math.random().toString(36).substring(2, 9)}`
})

defineEmits<{
  blur: []
}>()
</script>
