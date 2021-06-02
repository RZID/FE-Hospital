<template>
  <div>
    <Navbar />
    <div class="container my-4">
      <div class="d-flex justify-content-between">
        <h3>
          List Pasien
        </h3>
        <b-button variant="primary" @click="appendModalAddPasien">
          <b-icon-plus /> Add Pasien
        </b-button>
      </div>
      <Table />
      <ModalAddPasien />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/partials/Navbar";
import Table from "../components/Table";
import ModalAddPasien from "../components/AddPasien";

export default {
  data() {
    return {};
  },
  methods: {
    appendModalAddPasien() {
      return this.$bvModal.show("addPasienModal");
    },
  },
  components: {
    Navbar,
    Table,
    ModalAddPasien,
  },
  computed: {},
};
</script>
