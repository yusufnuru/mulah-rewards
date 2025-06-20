import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormDataStore = defineStore('formData', () => {
  const phoneNumber = ref('')
  const registrationData = ref({
    name: '',
    birthday: '',
    email: ''
  })

  return { phoneNumber, registrationData }
})
