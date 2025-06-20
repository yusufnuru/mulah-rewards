<script setup>
import { useFormDataStore } from '@/stores/formData'
import { onUnmounted } from 'vue';

const store = useFormDataStore()

onUnmounted(() => {
  store.$reset();
});
</script>

<template>
  <div class="max-w-md mx-auto bg-white min-h-screen p-8">
    <!-- Header -->
    <div class="text-center pt-12 pb-8">
      <div class="text-4xl font-bold font-mono text-orange-500 tracking-wider mb-8">
        MULAH
      </div>
    </div>

    <!-- Summary Details -->
    <div class="space-y-6 text-gray-700 text-lg">
      <h1 class="text-2xl font-semibold font-serif mb-4 tracking-wider text-center">Summary</h1>
      
      <div>
        <span class="font-medium">Phone Number:</span>
        <span class="ml-2">+60 {{ store.phoneNumber }}</span>
      </div>

      <div>
        <span class="font-medium">Name:</span>
        <span class="ml-2">{{ store.registrationData.name }}</span>
      </div>

      <div>
        <span class="font-medium">Birthday:</span>
        <span class="ml-2">{{ store.registrationData.birthday }}</span>
      </div>

      <div>
        <span class="font-medium">Email:</span>
        <span class="ml-2">{{ store.registrationData.email }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-8 pt-12 pb-8 border-t border-gray-200 mt-12 text-center text-gray-400 text-sm">
      <div class="text-center text-gray-400 text-sm">
        <RouterLink to="https://www.mulahrewards.com/" target="_blank" rel="noopener noreferrer" >
          Powered by <span class="text-blue-600 font-medium hover:underline">MulahRewards.com</span>
          </RouterLink>
      </div>
    </div>
  </div>
</template>
