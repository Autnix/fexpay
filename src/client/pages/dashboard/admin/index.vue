<template>
  <div class="page-full">
    <AdminTopbar :active="1" />
    <h1>ADMIN PANEL MORUQ</h1>
  </div>
</template>

<script>
import AdminTopbar from '@/components/admin/adminTopbar'
export default {
  components: {
    AdminTopbar,
  },
  middleware: ['admin'],
}
</script>
