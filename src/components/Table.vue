<template>
  <div class="my-4">
    <!-- If Ready -->
    <div v-if="currentState === 'ready'">
      <b-table striped hover :items="listPasien" :fields="fields" show-empty>
        <!-- Templating Empty Data -->
        <template #empty>
          <h5 class="text-center">
            Pasien data is empty
          </h5>
        </template>

        <!-- Templating records -->

        <template #cell(#)="data">
          {{ data.index + 1 }}
        </template>

        <!-- A custom formatted column -->
        <template #cell(gender)="data">
          {{ data.item.sex }}
        </template>

        <template #cell(action)="data">
          <b-button
            size="sm"
            class="mr-2"
            variant="success"
            @click="detailPasien(data.item.id)"
          >
            <b-icon-eye></b-icon-eye>
          </b-button>
          <b-button
            size="sm"
            class="mr-2"
            variant="warning"
            @click="updatePasien(data.item.id)"
          >
            <b-icon-pencil-square></b-icon-pencil-square>
          </b-button>
          <b-button
            size="sm"
            variant="danger"
            @click="deletePasien(data.item.id)"
          >
            <b-icon-trash-fill></b-icon-trash-fill>
          </b-button>
        </template>
        <!-- Data will appear here -->
      </b-table>
      <!-- Pagination purposes -->
      <div v-if="pagination.amountOfData - pagination.limit > 0">
        <b-pagination
          @input="paginate"
          v-model="pagination.currentPage"
          :total-rows="pagination.amountOfData"
          :per-page="pagination.limit"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
        ></b-pagination>
      </div>
    </div>

    <!-- If Loading -->
    <Loader v-else-if="currentState === 'loading'" />

    <!-- If Error -->
    <div v-else-if="currentState === 'error'">
      <h3>
        :( Oops...
      </h3>
      <p>An error occured</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loader from "../components/partials/Loading";
import SweetAlert from "../helpers/Sweetalert";
import Axios from "axios";
export default {
  mixins: [SweetAlert],
  data() {
    return {
      currentState: "nodata",
      fields: ["#", "name", "gender", "phone", "Action"],
    };
  },
  components: { Loader },
  methods: {
    ...mapActions({
      fetchListPasien: "fetchListPasien",
    }),
    getData(page, limit) {
      this.currentState = "loading";
      this.fetchListPasien(page, limit)
        .then(() => {
          this.currentState = "ready";
        })
        .catch(() => {
          this.currentState = "error";
        });
    },
    paginate() {
      this.getData(this.pagination.currentPage);
    },
    detailPasien(id) {
      this.$router.push(`/detail/${id}`);
    },
    updatePasien(id) {
      this.$router.push(`/update/${id}`);
    },
    deletePasien(id) {
      this.alertConfirmation(
        "Are you sure?",
        "Want to delete this pasien?",
        "Delete"
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
  computed: {
    ...mapGetters({
      listPasien: "getListPasien",
      pagination: "getPagination",
    }),
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped></style>
