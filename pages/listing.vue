<template>
  <div>
    <ListingAddress />
  </div>
</template>

<script>
  import ListingAddress from "../components/ListingAddress"

  export default {
    middleware: "auth",
    components:{
      ListingAddress
    },
    data() {
      return {
      };
    },
    methods: {
    
    } 
  }
</script>