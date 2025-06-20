<script setup>
import { ref } from 'vue';
import { useFormDataStore } from '@/stores/formData';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

const router = useRouter();
const store = useFormDataStore()
const form = ref({
  name: '',
  day: '',
  month: '',
  year: '',
  email: '',
  noEmail: false
});

const errors = ref({
  name: false,
  birthday: false,
  email: false
});

const handleNumericInput = (event, field) => {
  const value = event.target.value.replace(/[^0-9]/g, '');
  form.value[field] = value;
  clearError('birthday');
};

const handleNoEmailChange = () => {
  if (form.value.noEmail) {
    form.value.email = '';
    clearError('email');
  }
};

const clearError = (field) => {
  errors.value[field] = false;
};

const validateForm = () => {
  let isValid = true;

  // Reset errors
  errors.value = {
    name: false,
    birthday: false,
    email: false
  };

  // Validate name
  if (!form.value.name.trim()) {
    errors.value.name = true;
    isValid = false;
  }

  // Validate birthday
  if (!form.value.day || !form.value.month || !form.value.year) {
    errors.value.birthday = true;
    isValid = false;
  } else {
    const day = parseInt(form.value.day);
    const month = parseInt(form.value.month);
    const year = parseInt(form.value.year);

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
      errors.value.birthday = true;
      isValid = false;
    }
  }

  // Validate email (only if not checking "no email")
  if (!form.value.noEmail) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.value.email.trim() || !emailPattern.test(form.value.email)) {
      errors.value.email = true;
      isValid = false;
    }
  }

  return isValid;
};

const handleSubmit = () => {
  if (validateForm()) {
    console.log(validateForm());
    const birthday = `${form.value.day}/${form.value.month}/${form.value.year}`;

    store.registrationData = {
      name: form.value.name,
      birthday,
      email: form.value.noEmail ? 'No Email' : form.value.email
    }

    toast.success('Registration successful!');

    router.push('/summary');

    resetForm();
  }
};

const resetForm = () => {
  form.value = {
    name: '',
    day: '',
    month: '',
    year: '',
    email: '',
    noEmail: false
  };
  errors.value = {
    name: false,
    birthday: false,
    email: false
  };
};

</script>

<template>
  <div class="bg-gray-50">
    <div class="max-w-md mx-auto bg-white min-h-screen">
      <!-- Header -->
      <div class="text-center pt-12 pb-8">
        <div class="text-4xl font-bold font-mono text-orange-500 tracking-wider mb-8">
          MULAH
        </div>
      </div>

      <!-- Registration Form -->
      <div class="px-8">
        <h1 class="text-3xl font-light text-gray-700 mb-4 font-serif tracking-wider">Registration</h1>
        <p class="text-gray-500 italic text-lg mb-8">Please fill up your details.</p>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Field -->
          <div>
            <label class="block text-gray-700 text-lg font-medium mb-3">Name</label>
            <input 
              v-model="form.name"
              @input="clearError('name')"
              type="text" 
              placeholder="Enter Name" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            >
            <div v-if="errors.name" class="text-red-500 italic mt-1 text-sm">
              *Please insert a name.
            </div>
          </div>

          <!-- Birthday Field -->
          <div>
            <label class="block text-gray-700 text-lg font-medium mb-3">Birthday</label>
            <div class="flex space-x-3">
              <input 
                v-model="form.day"
                @input="handleNumericInput($event, 'day')"
                type="text" 
                placeholder="DD" 
                maxlength="2"
                class="w-1/4 px-3 py-3 border border-gray-300 rounded-lg text-center text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
              <input 
                v-model="form.month"
                @input="handleNumericInput($event, 'month')"
                type="text" 
                placeholder="MM" 
                maxlength="2"
                class="w-1/4 px-3 py-3 border border-gray-300 rounded-lg text-center text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
              <input 
                v-model="form.year"
                @input="handleNumericInput($event, 'year')"
                type="text" 
                placeholder="YYYY" 
                maxlength="4"
                class="w-1/2 px-3 py-3 border border-gray-300 rounded-lg text-center text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
            </div>
            <div v-if="errors.birthday" class="text-red-500 italic mt-1 text-sm">
              *Please insert your birthday.
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label class="block text-gray-700 text-lg font-medium mb-3">Email</label>
            <input 
              v-model="form.email"
              @input="clearError('email')"
              :disabled="form.noEmail"
              type="email" 
              placeholder="Email Address" 
              :class="[
                'w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500',
                { 'bg-gray-100': form.noEmail }
              ]"
            >
            <div v-if="errors.email" class="text-red-500 italic mt-1 text-sm">
              *Please insert a valid email address.
            </div>
            
            <!-- No email checkbox -->
            <div class="mt-3">
              <label class="flex items-center">
                <input 
                  v-model="form.noEmail"
                  @change="handleNoEmailChange"
                  type="checkbox" 
                  class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                >
                <span class="ml-2 text-gray-500 italic">No email address</span>
              </label>
            </div>
          </div>

          <!-- Continue Button -->
          <div class="pt-6 pb-8">
            <button 
              type="submit"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white text-xl font-medium py-4 rounded-full transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="px-8 pt-8 pb-8 border-t border-gray-200 mt-8">
          <div class="text-center text-gray-400 text-sm">
            <RouterLink to="https://www.mulahrewards.com/" target="_blank" rel="noopener noreferrer" >
              Powered by <span class="text-blue-600 font-medium hover:underline">MulahRewards.com</span>
            </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
