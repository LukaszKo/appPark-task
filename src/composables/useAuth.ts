// useAuth.ts
import { useMutation } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import { ref, computed } from 'vue'
import Cookies from 'js-cookie'

const TOKEN_COOKIE_NAME = 'auth_token'
const TOKEN_EXPIRY_DAYS = 7
const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`
interface LoginError {
  message: string
  type: 'NETWORK' | 'INVALID_CREDENTIALS' | 'UNKNOWN'
}

export function useAuth() {
  const token = ref<string | null>(Cookies.get(TOKEN_COOKIE_NAME) || null)
  const isLoading = ref(false)
  const error = ref<LoginError | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  const { mutate: loginMutation } = useMutation(LOGIN_USER)

  async function loginUser(email: string, password: string): Promise<boolean> {
    try {
      isLoading.value = true
      error.value = null

      const result = await loginMutation({ email, password })

      if (result?.data?.loginUser?.token) {
        token.value = result.data.loginUser.token

        // Store token in cookie with expiration
        Cookies.set(TOKEN_COOKIE_NAME, result.data.loginUser.token, {
          expires: TOKEN_EXPIRY_DAYS,
          secure: true,
          sameSite: 'lax',
          path: '/',
        })

        return true
      } else {
        error.value = {
          message: 'Nie otrzymano tokenu autoryzacji',
          type: 'UNKNOWN',
        }
        return false
      }
    } catch (err: unknown) {
      const apolloError = err as {
        networkError?: unknown
        graphQLErrors?: Array<{ message: string }>
      }

      if (apolloError.networkError) {
        error.value = {
          message: 'Brak połączenia z serwerem. Sprawdź połączenie internetowe.',
          type: 'NETWORK',
        }
      } else if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
        const graphqlError = apolloError.graphQLErrors[0]
        error.value = {
          message: graphqlError.message || 'Wystąpił błąd podczas logowania',
          type: 'UNKNOWN',
        }
      } else {
        error.value = {
          message: 'Wystąpił nieoczekiwany błąd',
          type: 'UNKNOWN',
        }
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    token.value = null
    Cookies.remove(TOKEN_COOKIE_NAME, { path: '/' })
  }

  function clearError() {
    error.value = null
  }

  function checkAuth() {
    const cookieToken = Cookies.get(TOKEN_COOKIE_NAME)
    if (cookieToken && !token.value) {
      token.value = cookieToken
    }
    return !!token.value
  }

  return {
    token,
    isAuthenticated,
    isLoading,
    error,
    loginUser,
    logout,
    clearError,
    checkAuth,
  }
}
