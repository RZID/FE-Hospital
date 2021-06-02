<template>
  <b-modal id="addPasienModal" hide-footer>
    <!-- Modal Header Template -->
    <template #modal-header="{ close }">
      <div class="d-flex justify-content-between w-100">
        <div>
          <h5 class="mb-0">
            Add Pasien Data
          </h5>
        </div>
        <a
          @click="close()"
          @mouseover="closeIcon = true"
          @mouseleave="closeIcon = false"
        >
          <b-icon-x-circle-fill variant="danger" v-if="closeIcon" />
          <b-icon-circle-fill variant="danger" v-else />
        </a>
      </div>
    </template>
    <!-- End Of Modal Header Template -->

    <b-form @submit.prevent="addPasien">
      <!-- Name -->
      <b-form-group label="Name" class="mb-3" label-for="input-name">
        <b-form-input
          v-model="form.name"
          id="input-name"
          type="text"
          placeholder="Enter name"
          required
        >
        </b-form-input>
      </b-form-group>

      <!-- Religion -->
      <b-form-group label="Religion" class="mb-3" label-for="input-religion">
        <b-form-input
          v-model="form.religion"
          id="input-religion"
          type="text"
          placeholder="Enter religion"
          required
        >
        </b-form-input>
      </b-form-group>

      <!-- NIK -->
      <b-form-group label="NIK" class="mb-3" label-for="input-nik">
        <b-form-input
          no-wheel
          v-model="form.nik"
          min="0"
          id="input-nik"
          type="number"
          placeholder="Enter NIK (Nomer Induk Kependudukan)"
          required
        >
        </b-form-input>
      </b-form-group>

      <!-- Phone -->
      <b-form-group label="Phone Number" class="mb-3" label-for="input-phone">
        <b-form-input
          no-wheel
          v-model="form.phone"
          min="0"
          id="input-phone"
          type="number"
          placeholder="Enter phone number"
          required
        >
        </b-form-input>
      </b-form-group>

      <!-- Address -->
      <b-form-group label="Address" class="mb-3" label-for="input-address">
        <b-form-textarea
          id="input-address"
          v-model="form.address"
          size="sm"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <!-- Gender -->
      <b-form-group label="Gender" class="mb-3">
        <b-form-radio-group v-model="form.sex" required>
          <b-form-radio value="Laki-laki">
            Laki-laki
          </b-form-radio>
          <b-form-radio value="Perempuan">
            Perempuan
          </b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <!-- Separator -->
      <hr />

      <!-- Footer -->
      <div class="mt-3 text-right">
        <b-button type="reset" variant="danger">
          Reset
        </b-button>
        <b-button class="ml-3" type="submit" variant="primary">
          Submit
        </b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import Axios from "axios";
import SweetAlert from "../helpers/Sweetalert";
import { mapActions } from "vuex";
export default {
  mixins: [SweetAlert],
  data() {
    return {
      form: {
        name: "",
        sex: "",
        religion: "",
        phone: null,
        address: "",
        nik: null,
      },
      closeIcon: false,
    };
  },
  methods: {
    ...mapActions({
      refreshListPasien: "fetchListPasien",
    }),
    addPasien() {
      Axios.post(`${process.env.VUE_APP_BACKEND}`, this.form)
        .then(() => {
          for (let key in this.form) {
            this.form[key] = "";
          }
          this.alertSuccess("Success", "Pasien data added succesfully!");
          this.refreshListPasien();
        })
        .catch((err) => {
          if (err) {
            this.alertError(
              "Oops",
              "An error occured when adding pasien. Please contact our administrator!"
            );
          }
        })
        .finally(() => {
          this.$bvModal.hide("addPasienModal");
        });
    },
  },
};
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
