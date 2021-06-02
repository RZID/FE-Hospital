<template>
  <div>
    <Navbar />
    <div class="container my-4">
      <h3 class="mb-4">
        <router-link to="/" class="text-dark">
          <b-icon-arrow-left-short />
        </router-link>
        Detail Pasien
      </h3>
      <div class="row no-gutters" v-if="!isLoading">
        <div class="col-4 col-md-3 col-lg-2">
          <b-list-group>
            <b-list-group-item class="border-right-0 text-end">
              Name
            </b-list-group-item>
            <b-list-group-item class="border-right-0 text-end">
              Gender
            </b-list-group-item>
            <b-list-group-item class="border-right-0 text-end">
              Religion
            </b-list-group-item>
            <b-list-group-item class="border-right-0 text-end">
              Phone
            </b-list-group-item>
            <b-list-group-item class="border-right-0 text-end">
              Address
            </b-list-group-item>
            <b-list-group-item class="border-right-0 text-end">
              NIK
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="col">
          <b-list-group>
            <b-list-group-item>{{ dataPasien.name }}</b-list-group-item>
            <b-list-group-item>{{ dataPasien.sex }}</b-list-group-item>
            <b-list-group-item>{{ dataPasien.religion }}</b-list-group-item>
            <b-list-group-item>{{ dataPasien.phone }}</b-list-group-item>
            <b-list-group-item>{{ dataPasien.address }}</b-list-group-item>
            <b-list-group-item>{{ dataPasien.nik }}</b-list-group-item>
          </b-list-group>
        </div>
        <div class="col-lg-3">
          <div
            class="ml-0 ml-md-3 mb-3 mb-md-0 mt-3 mt-md-0 d-flex d-md-block h-100"
          >
            <b-button
              block
              class="w-100 mb-md-3 mr-3 mr-md-0"
              variant="warning"
              @click="updatePasien()"
            >
              <b-icon-pencil-square />
              Update Data Pasien
            </b-button>
            <b-button
              block
              class="w-100"
              variant="danger"
              @click="deletePasien()"
            >
              <b-icon-trash-fill />
              Delete Data Pasien
            </b-button>
          </div>
        </div>
      </div>
      <Loader v-else />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/partials/Navbar";
import Axios from "axios";
import SweetAlert from "../helpers/Sweetalert";
import Loader from "../components/partials/Loading";
export default {
  data() {
    return {
      isLoading: false,
      id: this.$route.params.id,
      dataPasien: {},
    };
  },
  components: {
    Navbar,
    Loader,
  },
  mixins: [SweetAlert],
  methods: {
    getData(id) {
      this.isLoading = true;
      Axios.get(`${process.env.VUE_APP_BACKEND}/${id}`)
        .then((res) => {
          if (res.data.result) {
            this.dataPasien = res.data.result;
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
    updatePasien() {
      const id = this.id;
      this.$router.push(`/update/${id}`);
    },
    deletePasien() {
      const id = this.id;
      this.alertConfirmation(
        "Are you sure?",
        "Want to delete this pasien?",
        'Delete'
      ).then(() => {
        Axios.delete(`${process.env.VUE_APP_BACKEND}/${id}`).then(() => {
          this.alertSuccess(
            "Success",
            "the pasien data you selected has been deleted successfully!"
          );
          this.fetchListPasien();
        });
      });
    },
  },
  mounted() {
    this.getData(this.id);
  },
};
</script>
