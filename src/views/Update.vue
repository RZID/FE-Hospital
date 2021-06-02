<template>
  <div>
    <Navbar />
    <div class="container my-4">
      <h3 class="mb-4">
        <router-link to="/" class="text-dark">
          <b-icon-arrow-left-short />
        </router-link>
        Update Pasien
      </h3>
      <div v-if="!isLoading">
        <b-form @submit.prevent="updatePasien" @reset.prevent="resetForm">
          <div class="row">
            <!-- Name -->
            <div class="col">
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
            </div>

            <!-- Religion -->
            <div class="col">
              <b-form-group
                label="Religion"
                class="mb-3"
                label-for="input-religion"
              >
                <b-form-input
                  v-model="form.religion"
                  id="input-religion"
                  type="text"
                  placeholder="Enter religion"
                  required
                >
                </b-form-input>
              </b-form-group>
            </div>
          </div>

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
          <b-form-group
            label="Phone Number"
            class="mb-3"
            label-for="input-phone"
          >
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
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import SweetAlert from "../helpers/Sweetalert";
import Navbar from "../components/partials/Navbar";
import { mapActions } from "vuex";

export default {
  mixins: [SweetAlert],
  components: {
    Navbar,
  },
  data() {
    return {
      isLoading: false,
      id: this.$route.params.id,
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
    getData(id) {
      this.isLoading = true;
      Axios.get(`${process.env.VUE_APP_BACKEND}/${id}`)
        .then((res) => {
          if (res.data.result) {
            this.form = res.data.result;
          } else {
            this.alertError(
              "Oops",
              "The data you are referring to is not available"
            );
            this.$router.push("/");
          }
        })
        .catch((err) => {
          if (err) {
            this.alertError(
              "Oops",
              "An error occured, please contact our administrator!"
            );
            this.$router.push("/");
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    resetForm() {
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.getData(this.id);
    },
    updatePasien() {
      this.alertConfirmation(
        "Are you sure?",
        "Want to change Pasien data?",
        "Update"
      ).then(() => {
        Axios.put(`${process.env.VUE_APP_BACKEND}/${this.id}`, this.form)
          .then(() => {
            this.$router.push("/").catch(() => {});
            this.alertSuccess("Success!", "Pasien updated succesfully");
          })
          .catch((err) => {
            if (err) {
              this.alertError(
                "Oops",
                "An error occured when adding pasien. Please contact our administrator!"
              );
            }
          });
      });
    },
  },
  mounted() {
    this.getData(this.id);
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
