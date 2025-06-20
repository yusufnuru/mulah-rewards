<script setup>
import { Button } from '@/components/ui/button'
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useFormDataStore } from '@/stores/formData'

const store = useFormDataStore()
const router = useRouter()
const phoneNumber = ref('')
const errors = ref({
  phone: false,
  empty: false,
  invalid: false
})

// Validation functions
const validatePhoneNumber = () => {
  // Reset all errors
  errors.value = {
    phone: false,
    empty: false,
    invalid: false
  }
  
  // Check if phone number is empty
  if (!phoneNumber.value.trim()) {
    errors.value.empty = true
    return false
  }
  
  // Check if phone number contains only digits
  const phonePattern = /^\d+$/
  if (!phonePattern.test(phoneNumber.value)) {
    errors.value.invalid = true
    return false
  }
  
  // Check if phone number has minimum length (e.g., 8-12 digits)
  if (phoneNumber.value.length < 8 || phoneNumber.value.length > 12) {
    errors.value.invalid = true
    return false
  }
  
  // Check if it's the specific valid number for demo
  if (phoneNumber.value !== '173527250') {
    errors.value.phone = true
    return false
  }
  
  return true
}

const checkLoyaltyPoints = () => {
  if (validatePhoneNumber()) {
    store.phoneNumber = phoneNumber.value // Save to store
    router.push('/register')
  }
}

// Handle numeric input only
const handlePhoneInput = (event) => {
  // Allow only numeric input
  const value = event.target.value.replace(/[^0-9]/g, '')
  phoneNumber.value = value
  
  // Clear errors when user starts typing
  clearErrors()
}

// Handle keydown to prevent non-numeric keys
const handleKeyDown = (event) => {
  // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
  const allowedKeys = [
    'Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End',
    'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
  ]
  
  // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
  if (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) {
    return
  }
  
  // If it's not an allowed key and not a number, prevent it
  if (!allowedKeys.includes(event.key) && (event.key < '0' || event.key > '9')) {
    event.preventDefault()
  }
}

// Handle paste events to ensure only numbers are pasted
const handlePaste = (event) => {
  event.preventDefault()
  const paste = (event.clipboardData || window.clipboardData).getData('text')
  const numericValue = paste.replace(/[^0-9]/g, '')
  
  // Respect maxlength
  const maxLength = 12
  const finalValue = numericValue.slice(0, maxLength)
  
  phoneNumber.value = finalValue
  clearErrors()
}

// Clear all errors
const clearErrors = () => {
  errors.value = {
    phone: false,
    empty: false,
    invalid: false
  }
}

// Watch for changes to phoneNumber to clear errors
watch(phoneNumber, () => {
  clearErrors()
})

// Computed property to check if there are any errors
const hasErrors = () => {
  return errors.value.phone || errors.value.empty || errors.value.invalid
}

// Get error message based on error type
const getErrorMessage = () => {
  if (errors.value.empty) {
    return '*Please enter your mobile number.'
  }
  if (errors.value.invalid) {
    return '*Please enter a valid mobile number (8-12 digits).'
  }
  if (errors.value.phone) {
    return '*Please enter a valid phone number. Valid number is 173527250'
  }
  return ''
}
</script>

<template>
  <div class="max-w-md mx-auto bg-white min-h-screen">
        <!-- Header -->
        <div class="text-center pt-16 pb-8">
            <div class="text-6xl font-bold text-orange-500 tracking-wider mb-12 font-mono">
                MULAH
            </div>
        </div>

        <!-- Welcome Section -->
        <div class="px-8 mb-8">
            <h1 class="text-4xl font-semibold font-serif text-gray-700 mb-2 tracking-wide">Hello,</h1>
            <h2 class="text-4xl font-semibold font-serif text-gray-700 mb-8 tracking-wide">Welcome !</h2>
            
            <p class="text-orange-500 text-lg font-medium mb-12">
                Check Your Loyalty Points & Rewards
            </p>
        </div>

        <!-- Phone Input Section -->
        <div class="px-8 mb-8">
            <!-- Error Message -->
            <div v-if="hasErrors()" class="mb-3">
                <span class="text-red-500 italic text-sm">{{ getErrorMessage() }}</span>
            </div>
            
            <div 
              :class="[
                'flex items-center border-b-2 pb-2 mb-8 transition-colors duration-200',
                hasErrors() ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
              ]"
            >
                <div class="flex items-center mr-4">
                    <span class="text-gray-600 text-lg">+60</span>
                    <svg class="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
                <input 
                    v-model="phoneNumber"
                    @input="handlePhoneInput"
                    @keydown="handleKeyDown"
                    @paste="handlePaste"
                    type="tel" 
                    inputmode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter your mobile number" 
                    maxlength="12"
                    :class="[
                      'flex-1 text-lg outline-none bg-transparent placeholder-gray-400 transition-colors duration-200',
                      phoneNumber ? 'text-gray-700' : 'text-gray-400',
                      hasErrors() ? 'text-red-600' : ''
                    ]"
                >
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center ml-4 transition-colors duration-200',
                  phoneNumber && !hasErrors() ? 'bg-green-500' : 'bg-gray-400'
                ]">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
            </div>
            
            <!-- Check Button -->
            <Button 
              :class="[
                'w-full text-white text-xl font-medium py-5 rounded-full transition-colors duration-200',
                hasErrors() || !phoneNumber ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
              ]"
              :disabled="hasErrors() || !phoneNumber"
              @click="checkLoyaltyPoints"
            >
                Check Loyalty Points
            </Button>
        </div>

        <!-- Footer -->
        <div class="px-8 pt-16 pb-8">
            <div class="text-center text-gray-400 text-sm">
              <RouterLink to="https://www.mulahrewards.com/" target="_blank" rel="noopener noreferrer" >
                Powered by <span class="text-blue-600 font-medium hover:underline">MulahRewards.com</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style>
</style>